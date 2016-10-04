(function (global) {
  var DemoViewModel,
      geoTransitionListener = null,
      app = global.app = global.app || {};
  
  DemoViewModel = kendo.data.ObservableObject.extend({
    
    sendInvitations: function () {
      if (!this.checkSimulator()) {
        FirebaseInvites.sendInvitation(
          {
              title: "The title",
              message: "The message",
              deepLink: "myapp://deeplink",
              callToActionText: "Install please!",
              description: "My description",
              customImage: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
              //emailSubject: "My Email subject",
              //emailHtmlContent: "Some <strong>HTML</strong> content",
              androidClientID: "123abc",
              // You can find your iOS app's client ID in the GoogleService-Info.plist file you downloaded from the Firebase console
              iosClientID: "abc123"
          },
          function (msg) {
            alert(JSON.stringify(msg));
          },
          function (msg) {
            alert(JSON.stringify(msg));
          }
        );
      }
    },

    getInvitation: function () {
      if (!this.checkSimulator()) {
        FirebaseInvites.getInvitation(
          function (msg) {
            alert(JSON.stringify(msg));
          },
          function (msg) {
            alert(JSON.stringify(msg));
          }
        );
      }
    },

    login: function () {
      if (!this.checkSimulator()) {
        var feedback = document.querySelector("#feedback");
        window.plugins.googleplus.login(
          {},
          function (obj) {
            feedback.innerHTML = "Hi, " + obj.displayName + ", " + obj.email;

            var image = document.querySelector("#image");
            image.src = obj.imageUrl;
            image.style.visibility = 'visible';
          },
          function (msg) {
            feedback.innerHTML = "error: " + msg;
          }
        );
      }
    },

    trySilentLogin: function () {
      if (!this.checkSimulator()) {
        var feedback = document.querySelector("#feedback");
        window.plugins.googleplus.trySilentLogin(
          {},
          function (obj) {
            feedback.innerHTML = "(Silent) Hi, " + obj.displayName + ", " + obj.email;

            var image = document.querySelector("#image");
            image.src = obj.imageUrl;
            image.style.visibility = 'visible';
          },
          function (msg) {
            feedback.innerHTML = "error: " + msg;
          }
        );
      }
    },
    
    logout: function () {
      if (!this.checkSimulator()) {
        var feedback = document.querySelector("#feedback");
        window.plugins.googleplus.logout(
          function (msg) {
            feedback.innerHTML = msg;
            document.querySelector("#image").style.visibility = 'hidden';
          },
          function (msg) {
            feedback.innerHTML = "error: " + msg;
          }
        );
      }
    },

    disconnect: function () {
      if (!this.checkSimulator()) {
        var feedback = document.querySelector("#feedback");
        window.plugins.googleplus.disconnect(
          function (msg) {
            feedback.innerHTML = msg;
            document.querySelector("#image").style.visibility = 'hidden';
          },
          function (msg) {
            feedback.innerHTML = "error: " + msg;
          }
        );
      }
    },

    checkSimulator: function() {
      if (window.navigator.simulator === true) {
        alert('This plugin is not available in the simulator.');
        return true;
      } else if (window.FirebaseInvites === undefined) {
        alert('Plugin not found. Maybe you are running in AppBuilder Companion app which currently does not support this plugin.');
        return true;
      } else {
        return false;
      }
    }
  });

  app.demoService = {
    viewModel: new DemoViewModel()
  };
})(window);