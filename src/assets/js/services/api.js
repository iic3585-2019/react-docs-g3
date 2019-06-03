import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3000');
export function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}

export function subscribeToFileProgress(cb) {
  socket.on('fileProgress', data => cb(null, data));
}

export function subscribeToFileUploaded(cb) {
  socket.on('fileUploaded', data => cb(null, data));
}

export function unsubscribeToFileUploaded(cb) {
  socket.off('fileUploaded', cb());
}

export default {
  subscribeToTimer,
  subscribeToFileProgress,
  subscribeToFileUploaded,
  unsubscribeToFileUploaded,
};
