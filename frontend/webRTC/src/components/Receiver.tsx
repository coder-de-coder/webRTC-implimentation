import { useEffect } from "react";

export const Receiver = () => {

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');
        socket.onopen = () => {
            socket.send(JSON.stringify({
                type: 'receiver'
            }));
        }
        startReceiving(socket);
    }, []);

    function startReceiving(socket: WebSocket) {
        const video = document.createElement('video');
        video.style.width = '640px'; 
        video.style.height = '480px';
        document.body.appendChild(video);

        const pc = new RTCPeerConnection();

        pc.ontrack = (event) => {
            const stream = new MediaStream();
            stream.addTrack(event.track);
            video.srcObject = stream;
            video.play().catch(error => console.error('Error playing video:', error));
        };

        pc.onicecandidate = (event) => {
            if (event.candidate) {
                socket.send(JSON.stringify({
                    type: 'iceCandidate',
                    candidate: event.candidate
                }));
            }
        };

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === 'createOffer') {
                pc.setRemoteDescription(new RTCSessionDescription(message.sdp)).then(() => {
                    pc.createAnswer().then((answer) => {
                        pc.setLocalDescription(answer);
                        socket.send(JSON.stringify({
                            type: 'createAnswer',
                            sdp: answer
                        }));
                    });
                }).catch(error => console.error('Error setting remote description:', error));
            } else if (message.type === 'iceCandidate') {
                pc.addIceCandidate(new RTCIceCandidate(message.candidate)).catch(error => console.error('Error adding ICE candidate:', error));
            }
        };
    }

    return <div>
        <h3>Receiver</h3>
    </div>
};
