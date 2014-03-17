(function() {
  var Main;

  Main = (function() {
    function Main() {
      this.vars();
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
      return this.animate = this.bind(this.animate, this);
    };

    Main.prototype.launchClouds = function() {
      var base, cloud1, cloud11, cloudEnd, cloudStart, it, time;
      it = this;
      cloudStart = 3200;
      cloudEnd = -400;
      cloud1 = document.getElementById('js-cloud1');
      cloud11 = document.getElementById('js-cloud11');
      base = 20000;
      time = 10000;
      this.cloud1Tween = new TWEEN.Tween({
        left: cloudStart
      }).to({
        left: cloudEnd
      }, time + base).onUpdate(function() {
        return cloud1.setAttribute('transform', "translate(" + this.left + ")");
      }).repeat(9999999).start({
        progress: .5
      });
      this.cloud11Tween = new TWEEN.Tween({
        left: cloudStart
      }).to({
        left: cloudEnd
      }, time + base).onUpdate(function() {
        return cloud11.setAttribute('transform', "translate(" + this.left + ")");
      }).repeat(9999999).delay((time + base) / 2).start({
        progress: .5
      });
      return console.log(this.cloud41Tween);
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
              cabin.children[0].setAttribute('xlink:href', '#cabin2');
              cabin.isRotated = true;
            }
          } else {
            if (cabin.isRotated) {
              cabin.children[0].setAttribute('xlink:href', '#cabin1');
              cabin.isRotated = false;
            }
          }
          attr = "translate(" + x + ", " + y + ") rotate(" + angle + ",38,23)";
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
              cabin.children[0].setAttribute('xlink:href', '#cabin2');
              cabin.isRotated = true;
            }
          } else {
            if (cabin.isRotated) {
              cabin.children[0].setAttribute('xlink:href', '#cabin1');
              cabin.isRotated = false;
            }
          }
          attr = "translate(" + x + ", " + y + ") rotate(" + angle + ",38,23)";
          _results.push(cabin.setAttribute('transform', attr));
        }
        return _results;
      }).repeat(999999999999).start();
    };

    Main.prototype.animate = function() {
      requestAnimationFrame(this.animate);
      return TWEEN.update();
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
