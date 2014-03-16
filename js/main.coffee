class Main
  constructor:->
    @vars()
    @launchTrain1()
    @animate()
  vars:->
    @cabinWidth = 100
    @train1 =
      cabins: []
      path: document.getElementById('js-blue-path')
    for i in [1..5]
      if cabin = document.getElementById("js-blue-train-cabin#{i}")
        @train1.cabins.push cabin

    @animate = @bind @animate, @

  launchTrain1:->
    it = @
    @train1Tween = new TWEEN.Tween({ length: @train1.path.getTotalLength() })
      .to({ length: 0 }, 10000)
      .onUpdate(->
        for cabin, i in it.train1.cabins
          shift = i*it.cabinWidth
          point = it.train1.path.getPointAtLength @length-shift
          prevPoint = it.train1.path.getPointAtLength @length-shift-1
          x1 = point.y - prevPoint.y
          x2 = point.x - prevPoint.x
          angle = Math.atan(x1/x2)*(180/Math.PI)
          x = point.x - 30
          y = point.y - 54
          if (point.x-prevPoint.x > 0)
            angle = 180 + angle
          attr = "translate(#{x}, #{y}) rotate(#{angle},38,23)"
          cabin.setAttribute 'transform', attr
      ).repeat(999999999999).start()

  animate:->
    requestAnimationFrame(@animate)
    TWEEN.update()

  bind:(func, context) ->
    wrapper = ->
      args = Array::slice.call(arguments)
      unshiftArgs = bindArgs.concat(args)
      func.apply context, unshiftArgs
    bindArgs = Array::slice.call(arguments, 2)
    wrapper


new Main