(function() {
  var Main;

  Main = (function() {
    function Main() {
      this.vars();
      this.launchTrain1();
      this.animate();
    }

    Main.prototype.vars = function() {
      var cabin, i, _i;
      this.cabinWidth = 100;
      this.train1 = {
        cabins: [],
        path: document.getElementById('js-blue-path')
      };
      for (i = _i = 1; _i <= 5; i = ++_i) {
        if (cabin = document.getElementById("js-blue-train-cabin" + i)) {
          this.train1.cabins.push(cabin);
        }
      }
      return this.animate = this.bind(this.animate, this);
    };

    Main.prototype.launchTrain1 = function() {
      var it;
      it = this;
      return this.train1Tween = new TWEEN.Tween({
        length: this.train1.path.getTotalLength()
      }).to({
        length: 0
      }, 10000).onUpdate(function() {
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
            angle = 180 + angle;
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
