export function u_atob (ascii) {
  return new TextDecoder().decode(Uint8Array.from(atob(ascii), c => c.charCodeAt(0)));
}

export function u_btoa(buffer){
  let binary = [];
  var bytes = new Uint8Array(new TextEncoder().encode(buffer));
  for (var i = 0, il = bytes.byteLength; i < il; i++) {

    binary.push(String.fromCharCode(bytes[i]));
  }
  return btoa(binary.join(''));
}
