import { dlopen, FFIType } from "bun:ffi";

// Define necessary libraries and symbols for interacting with macOS
const { symbols: { objc_getClass, sel_registerName, objc_msgSend } } = dlopen("/System/Library/Frameworks/AppKit.framework/AppKit", {
  objc_getClass: { args: [FFIType.pointer], returns: FFIType.pointer },
  sel_registerName: { args: [FFIType.pointer], returns: FFIType.pointer },
  objc_msgSend: { args: [FFIType.pointer, FFIType.pointer, FFIType.pointer], returns: FFIType.pointer },
});

// Helper functions
function sendMsg(obj, sel, ...args) {
  const selPtr = sel_registerName(Buffer.from(sel + '\0', 'utf8'));
  return objc_msgSend(obj, selPtr, ...args.map(arg => typeof arg === 'string' ? Buffer.from(arg + '\0', 'utf8') : arg));
}

function bufferFromString(string) {
  return Buffer.from(string + '\0', 'utf8');
}

function getClass(className) {
  return objc_getClass(bufferFromString(className));
}

function NSStringFromString(string) {
  const NSString = getClass("NSString");
  const sel = sel_registerName(bufferFromString("stringWithUTF8String:"));
  return sendMsg(NSString, "stringWithUTF8String:", bufferFromString(string));
}

// Setup application
const NSApplication = getClass("NSApplication");
const app = sendMsg(NSApplication, "sharedApplication");
sendMsg(app, "setActivationPolicy:", 1);
sendMsg(app, "run");