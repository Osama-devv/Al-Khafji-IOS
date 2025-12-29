import UIKit
import react_native_app_auth
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider
import FirebaseCore
import FirebaseFirestore
import FirebaseMessaging

@main
class AppDelegate: RCTAppDelegate, RNAppAuthAuthorizationFlowManager { // 👈 Conform to the protocol

  // 👇 Required property for the protocol
  public weak var authorizationFlowManagerDelegate: RNAppAuthAuthorizationFlowManagerDelegate?

  override func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
    self.moduleName = "alkhafji"
    self.dependencyProvider = RCTAppDependencyProvider()

    // You can add your custom initial props in the dictionary below.
    // They will be passed down to the ViewController used by React Native.
    self.initialProps = [:]
    FirebaseApp.configure()
    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }

  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }

  override func bundleURL() -> URL? {
#if DEBUG
    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }

  // 👇 Add this method to handle deep linking for OAuth
  override func application(
    _ app: UIApplication,
    open url: URL,
    options: [UIApplication.OpenURLOptionsKey : Any] = [:]
  ) -> Bool {
    return authorizationFlowManagerDelegate?.resumeExternalUserAgentFlow(with: url) ?? false
  }
}
