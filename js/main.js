(function() {
  var Main;

  Main = (function() {
    function Main() {
      this.vars();
      this.fixIEPatterns();
      this.launchTrains();
      this.launchClouds();
      this.animate();
    }

    Main.prototype.vars = function() {
      var cabin, i, _i, _j;
      this.train1 = {
        cabins: [],
        path: document.getElementById('js-blue-path')
      };
      for (i = _i = 1; _i <= 5; i = ++_i) {
        if (cabin = document.getElementById("js-blue-train-cabin" + i)) {
          this.train1.cabins.push(cabin);
        }
      }
      this.cabinWidth = 2.5 * this.train1.cabins[0].getBoundingClientRect().width;
      this.train2 = {
        cabins: [],
        path: document.getElementById('js-yellow-path')
      };
      for (i = _j = 1; _j <= 5; i = ++_j) {
        if (cabin = document.getElementById("js-yellow-train-cabin" + i)) {
          this.train2.cabins.push(cabin);
        }
      }
      this.cabinWidth = 2.5 * this.train1.cabins[0].getBoundingClientRect().width;
      this.childNode = this.isIE() ? 1 : 0;
      this.childMethod = this.isIE() ? 'childNodes' : 'children';
      return this.animate = this.bind(this.animate, this);
    };

    Main.prototype.fixIEPatterns = function() {
      if (!this.isIE()) {
        return;
      }
      console.log('ie');
      this.addImageToPattern({
        pattern: 'pattern2',
        image: 'css/i/pattern2.png'
      });
      this.addImageToPattern({
        pattern: 'pattern3',
        image: 'css/i/pattern3.png'
      });
      this.addImageToPattern({
        pattern: 'pattern4',
        image: 'css/i/pattern4.png'
      });
      return this.addImageToPattern({
        pattern: 'pattern5',
        image: 'css/i/pattern5.png'
      });
    };

    Main.prototype.addImageToPattern = function(o) {
      var pattern, receptacle, svgfragment;
      pattern = document.getElementById(o.pattern);
      console.log(pattern);
      receptacle = document.createElement('div');
      svgfragment = "<svg><image xmlns=\"http://www.w3.org/2000/svg\" width=\"108px\" height=\"108px\" xlink:href=\"" + o.image + "\" /></svg>";
      receptacle.innerHTML = '' + svgfragment;
      return Array.prototype.slice.call(receptacle.childNodes[0].childNodes).forEach(function(el) {
        return pattern.appendChild(el);
      });
    };

    Main.prototype.launchClouds = function() {
      var cloud1, cloud11, cloud2, cloud21, cloud3, cloud31, cloud4, cloud41, cloudEnd, cloudStart, it, time;
      it = this;
      cloudStart = 3200;
      cloudEnd = -400;
      cloud1 = document.getElementById('js-cloud1');
      cloud11 = document.getElementById('js-cloud11');
      time = 90000;
      this.cloud1Tween = new TWEEN.Tween({
        left: cloudStart
      }).to({
        left: cloudEnd
      }, time).onUpdate(function() {
        return cloud1.setAttribute('transform', "translate(" + this.left + ")");
      }).repeat(9999999).start({
        progress: .65
      });
      this.cloud11Tween = new TWEEN.Tween({
        left: cloudStart
      }).to({
        left: cloudEnd
      }, time).onUpdate(function() {
        return cloud11.setAttribute('transform', "translate(" + this.left + ")");
      }).repeat(9999999).delay(time / 2).start({
        progress: .65
      });
      cloud2 = document.getElementById('js-cloud2');
      cloud21 = document.getElementById('js-cloud21');
      time = 75000;
      this.cloud2Tween = new TWEEN.Tween({
        left: cloudStart
      }).to({
        left: cloudEnd
      }, time).onUpdate(function() {
        return cloud2.setAttribute('transform', "translate(" + this.left + ")");
      }).repeat(9999999).start({
        progress: .25
      });
      this.cloud21Tween = new TWEEN.Tween({
        left: cloudStart
      }).to({
        left: cloudEnd
      }, time).onUpdate(function() {
        return cloud21.setAttribute('transform', "translate(" + this.left + ")");
      }).repeat(9999999).delay(time / 2).start({
        progress: .25
      });
      cloud3 = document.getElementById('js-cloud3');
      cloud31 = document.getElementById('js-cloud31');
      time = 100000;
      this.cloud3Tween = new TWEEN.Tween({
        left: cloudStart
      }).to({
        left: cloudEnd
      }, time).onUpdate(function() {
        return cloud3.setAttribute('transform', "translate(" + this.left + ")");
      }).repeat(9999999).start({
        progress: .75
      });
      this.cloud31Tween = new TWEEN.Tween({
        left: cloudStart
      }).to({
        left: cloudEnd
      }, time).onUpdate(function() {
        return cloud31.setAttribute('transform', "translate(" + this.left + ")");
      }).repeat(9999999).delay(time / 2).start({
        progress: .75
      });
      cloud4 = document.getElementById('js-cloud4');
      cloud41 = document.getElementById('js-cloud41');
      time = 110000;
      this.cloud4Tween = new TWEEN.Tween({
        left: cloudStart
      }).to({
        left: cloudEnd
      }, time).onUpdate(function() {
        return cloud4.setAttribute('transform', "translate(" + this.left + ")");
      }).repeat(9999999).start();
      return this.cloud41Tween = new TWEEN.Tween({
        left: cloudStart
      }).to({
        left: cloudEnd
      }, time).onUpdate(function() {
        return cloud41.setAttribute('transform', "translate(" + this.left + ")");
      }).repeat(9999999).delay(time / 2).start();
    };

    Main.prototype.launchTrains = function() {
      var it;
      it = this;
      this.train1Tween = new TWEEN.Tween({
        length: this.train1.path.getTotalLength()
      }).to({
        length: 0
      }, 8000).onUpdate(function() {
        var angle, attr, cabin, i, point, prevPoint, shift, x, x1, x2, y, _i, _len, _ref, _results;
        _ref = it.train1.cabins;
        _results = [];
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          cabin = _ref[i];
          shift = i * it.cabinWidth;
          point = it.train1.path.getPointAtLength(this.length - shift);
          prevPoint = it.train1.path.getPointAtLength(this.length - shift - 1);
          x1 = point.y - prevPoint.y;
          x2 = point.x - prevPoint.x;
          angle = Math.atan(x1 / x2) * (180 / Math.PI);
          x = point.x - 30;
          y = point.y - 54;
          if (point.x - prevPoint.x > 0) {
            if (!cabin.isRotated) {
              cabin[it.childMethod][it.childNode].setAttribute('xlink:href', '#cabin2');
              cabin.isRotated = true;
            }
          } else {
            if (cabin.isRotated) {
              cabin[it.childMethod][it.childNode].setAttribute('xlink:href', '#cabin1');
              cabin.isRotated = false;
            }
          }
          attr = "translate(" + x + ", " + y + ") rotate(" + (angle || 0) + ",38,23)";
          _results.push(cabin.setAttribute('transform', attr));
        }
        return _results;
      }).repeat(999999999999).start();
      return this.train2Tween = new TWEEN.Tween({
        length: this.train2.path.getTotalLength()
      }).to({
        length: 0
      }, 5000).onUpdate(function() {
        var angle, attr, cabin, i, point, prevPoint, shift, x, x1, x2, y, _i, _len, _ref, _results;
        _ref = it.train2.cabins;
        _results = [];
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          cabin = _ref[i];
          shift = i * it.cabinWidth;
          point = it.train2.path.getPointAtLength(this.length - shift);
          prevPoint = it.train2.path.getPointAtLength(this.length - shift - 1);
          x1 = point.y - prevPoint.y;
          x2 = point.x - prevPoint.x;
          angle = Math.atan(x1 / x2) * (180 / Math.PI);
          x = point.x - 50;
          y = point.y - 54;
          if (point.x - prevPoint.x > 0) {
            if (!cabin.isRotated) {
              cabin[it.childMethod][it.childNode].setAttribute('xlink:href', '#cabin2');
              cabin.isRotated = true;
            }
          } else {
            if (cabin.isRotated) {
              cabin[it.childMethod][it.childNode].setAttribute('xlink:href', '#cabin1');
              cabin.isRotated = false;
            }
          }
          attr = "translate(" + x + ", " + y + ") rotate(" + (angle || 0) + ",38,23)";
          _results.push(cabin.setAttribute('transform', attr));
        }
        return _results;
      }).repeat(999999999999).start();
    };

    Main.prototype.animate = function() {
      requestAnimationFrame(this.animate);
      return TWEEN.update();
    };

    Main.prototype.isIE = function() {
      var msie, rv, rvNum, trident, ua, undef;
      if (this.isIECache) {
        return this.isIECache;
      }
      undef = void 0;
      rv = -1;
      ua = window.navigator.userAgent;
      msie = ua.indexOf("MSIE ");
      trident = ua.indexOf("Trident/");
      if (msie > 0) {
        rv = parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
      } else if (trident > 0) {
        rvNum = ua.indexOf("rv:");
        rv = parseInt(ua.substring(rvNum + 3, ua.indexOf(".", rvNum)), 10);
      }
      this.isIECache = (rv > -1 ? rv : undef);
      return this.isIECache;
    };

    Main.prototype.bind = function(func, context) {
      var bindArgs, wrapper;
      wrapper = function() {
        var args, unshiftArgs;
        args = Array.prototype.slice.call(arguments);
        unshiftArgs = bindArgs.concat(args);
        return func.apply(context, unshiftArgs);
      };
      bindArgs = Array.prototype.slice.call(arguments, 2);
      return wrapper;
    };

    return Main;

  })();

  new Main;

}).call(this);
