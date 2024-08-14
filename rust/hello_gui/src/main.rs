extern crate cocoa;
use cocoa::base::NO;
use cocoa::base::nil;
use cocoa::appkit::{NSApp, NSApplication, NSApplicationActivationPolicyRegular, NSButton, NSWindow, NSWindowStyleMask, NSBackingStoreType};
use cocoa::foundation::{NSAutoreleasePool, NSPoint, NSRect, NSSize, NSString};
use cocoa::appkit::NSView;

fn main() {
    unsafe {
        let _pool = NSAutoreleasePool::new(nil);
        let app = NSApp();
        app.setActivationPolicy_(NSApplicationActivationPolicyRegular);

        let window = NSWindow::alloc(nil).initWithContentRect_styleMask_backing_defer_(
            NSRect::new(NSPoint::new(0.0, 0.0), NSSize::new(400.0, 300.0)),
            NSWindowStyleMask::NSTitledWindowMask,
            NSBackingStoreType::NSBackingStoreBuffered,
            NO,
        );
        NSWindow::setTitle_(window, NSString::alloc(nil).init_str("Hello World"));
        window.makeKeyAndOrderFront_(nil);

        let button = NSButton::initWithFrame_(NSButton::alloc(nil), NSRect::new(NSPoint::new(100.0, 100.0), NSSize::new(200.0, 100.0)));
        NSButton::setTitle_(window, NSString::alloc(nil).init_str("Click Me"));
        window.contentView().addSubview_(button);

        app.run();
    }
}
