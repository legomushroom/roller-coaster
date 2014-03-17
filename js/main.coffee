class Main
  constructor:->
    @vars()
    @launchTrains()
    @launchClouds()
    @animate()
  vars:->
    @train1 =
      cabins: []
      path: document.getElementById('js-blue-path')
    for i in [1..5]
      if cabin = document.getElementById("js-blue-train-cabin#{i}")
        @train1.cabins.push cabin
    @cabinWidth = 2.5*@train1.cabins[0].getBoundingClientRect().width

    @train2 =
      cabins: []
      path: document.getElementById('js-yellow-path')
    for i in [1..5]
      if cabin = document.getElementById("js-yellow-train-cabin#{i}")
        @train2.cabins.push cabin
    @cabinWidth = 2.5*@train1.cabins[0].getBoundingClientRect().width

    @animate = @bind @animate, @

  launchClouds:->
    it = @
    cloudStart  = 3200
    cloudEnd    = -400
    cloud1  = document.getElementById('js-cloud1')
    cloud11 = document.getElementById('js-cloud11')
    
    base = 20000
    time = 10000
    @cloud1Tween = new TWEEN.Tween({ left: cloudStart })
      .to({ left: cloudEnd }, time+base)
      .onUpdate(->
        cloud1.setAttribute 'transform', "translate(#{@left})"
      ).repeat(9999999).start(progress: .5)
    @cloud11Tween = new TWEEN.Tween({ left: cloudStart })
      .to({ left: cloudEnd }, time+base)
      .onUpdate(->
        cloud11.setAttribute 'transform', "translate(#{@left})"
      ).repeat(9999999).delay((time+base)/2).start(progress: .5)
    # cloud2  = document.getElementById('js-cloud2')
    # cloud21 = document.getElementById('js-cloud21')
    # time = 5000
    # @cloud2Tween = new TWEEN.Tween({ left: cloudStart })
    #   .to({ left: cloudEnd }, time+base)
    #   .onUpdate(->
    #     cloud2.setAttribute 'transform', "translate(#{@left})"
    #   ).repeat(9999999).start()
    # @cloud21Tween = new TWEEN.Tween({ left: cloudStart })
    #   .to({ left: cloudEnd }, time+base)
    #   .onUpdate(->
    #     cloud21.setAttribute 'transform', "translate(#{@left})"
    #   ).repeat(9999999).delay((time+base)/2).start()
    # cloud3  = document.getElementById('js-cloud3')
    # cloud31 = document.getElementById('js-cloud31')
    # time = 7000
    # @cloud3Tween = new TWEEN.Tween({ left: cloudStart })
    #   .to({ left: cloudEnd }, time+base)
    #   .onUpdate(->
    #     cloud3.setAttribute 'transform', "translate(#{@left})"
    #   ).repeat(9999999).start()
    # @cloud31Tween = new TWEEN.Tween({ left: cloudStart })
    #   .to({ left: cloudEnd }, time+base)
    #   .onUpdate(->
    #     cloud31.setAttribute 'transform', "translate(#{@left})"
    #   ).repeat(9999999).delay((time+base)/2).start()
    # cloud4  = document.getElementById('js-cloud4')
    # cloud41 = document.getElementById('js-cloud41')
    # time = 2000
    # @cloud4Tween = new TWEEN.Tween({ left: cloudStart })
    #   .to({ left: cloudEnd }, time+base)
    #   .onUpdate(->
    #     cloud4.setAttribute 'transform', "translate(#{@left})"
    #   ).repeat(9999999).start()
    # @cloud41Tween = new TWEEN.Tween({ left: cloudStart })
    #   .to({ left: cloudEnd }, time+base)
    #   .onUpdate(->
    #     cloud41.setAttribute 'transform', "translate(#{@left})"
    #   ).repeat(9999999).delay((time+base)/2).start()

    console.log @cloud41Tween


  launchTrains:->
    it = @
    @train1Tween = new TWEEN.Tween({ length: @train1.path.getTotalLength() })
      .to({ length: 0 }, 8000)
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
            if !cabin.isRotated
              cabin.children[0].setAttribute 'xlink:href', '#cabin2'
              cabin.isRotated = true
          else
            if cabin.isRotated
              cabin.children[0].setAttribute 'xlink:href', '#cabin1'
              cabin.isRotated = false
          attr = "translate(#{x}, #{y}) rotate(#{angle},38,23)"
          cabin.setAttribute 'transform', attr
      ).repeat(999999999999).start()


    @train2Tween = new TWEEN.Tween({ length: @train2.path.getTotalLength() })
      .to({ length: 0 }, 5000)
      .onUpdate(->
        for cabin, i in it.train2.cabins
          shift = i*it.cabinWidth
          point = it.train2.path.getPointAtLength @length-shift
          prevPoint = it.train2.path.getPointAtLength @length-shift-1
          x1 = point.y - prevPoint.y
          x2 = point.x - prevPoint.x
          angle = Math.atan(x1/x2)*(180/Math.PI)
          x = point.x - 50
          y = point.y - 54
          if (point.x-prevPoint.x > 0)
            if !cabin.isRotated
              cabin.children[0].setAttribute 'xlink:href', '#cabin2'
              cabin.isRotated = true
          else
            if cabin.isRotated
              cabin.children[0].setAttribute 'xlink:href', '#cabin1'
              cabin.isRotated = false
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