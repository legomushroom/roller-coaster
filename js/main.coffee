class Main
  constructor:->
    @vars()
    @fixIEPatterns()
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

    @childNode    = if @isIE() then 1 else 0
    @childMethod  = if @isIE() then 'childNodes' else 'children'

    @ns = 'http://www.w3.org/2000/svg'

    @animate = @bind @animate, @

  fixIEPatterns:->
    if !@isIE() then return
    console.log 'ie'
    pattern4 = document.getElementById 'pattern4'
    receptacle = document.createElement('div')
    svgfragment = '<svg>' + '<image xmlns="http://www.w3.org/2000/svg" width="108px" height="108px" xlink:href="css/i/pattern4.png" />' + '</svg>';
    receptacle.innerHTML = '' + svgfragment
    Array.prototype.slice.call(receptacle.childNodes[0].childNodes).forEach((el)->
      pattern4.appendChild(el)
    )

  launchClouds:->
    it = @
    cloudStart  = 3200
    cloudEnd    = -400
    cloud1  = document.getElementById('js-cloud1')
    cloud11 = document.getElementById('js-cloud11')
    
    time = 90000
    @cloud1Tween = new TWEEN.Tween({ left: cloudStart })
      .to({ left: cloudEnd }, time)
      .onUpdate(->
        cloud1.setAttribute 'transform', "translate(#{@left})"
      ).repeat(9999999).start(progress: .65)
    @cloud11Tween = new TWEEN.Tween({ left: cloudStart })
      .to({ left: cloudEnd }, time)
      .onUpdate(->
        cloud11.setAttribute 'transform', "translate(#{@left})"
      ).repeat(9999999).delay((time)/2).start(progress: .65)
    cloud2  = document.getElementById('js-cloud2')
    cloud21 = document.getElementById('js-cloud21')
    time = 75000
    @cloud2Tween = new TWEEN.Tween({ left: cloudStart })
      .to({ left: cloudEnd }, time)
      .onUpdate(->
        cloud2.setAttribute 'transform', "translate(#{@left})"
      ).repeat(9999999).start(progress: .25)
    @cloud21Tween = new TWEEN.Tween({ left: cloudStart })
      .to({ left: cloudEnd }, time)
      .onUpdate(->
        cloud21.setAttribute 'transform', "translate(#{@left})"
      ).repeat(9999999).delay((time)/2).start(progress: .25)
    cloud3  = document.getElementById('js-cloud3')
    cloud31 = document.getElementById('js-cloud31')
    time = 100000
    @cloud3Tween = new TWEEN.Tween({ left: cloudStart })
      .to({ left: cloudEnd }, time)
      .onUpdate(->
        cloud3.setAttribute 'transform', "translate(#{@left})"
      ).repeat(9999999).start(progress: .75)
    @cloud31Tween = new TWEEN.Tween({ left: cloudStart })
      .to({ left: cloudEnd }, time)
      .onUpdate(->
        cloud31.setAttribute 'transform', "translate(#{@left})"
      ).repeat(9999999).delay((time)/2).start(progress: .75)
    cloud4  = document.getElementById('js-cloud4')
    cloud41 = document.getElementById('js-cloud41')
    time = 110000
    @cloud4Tween = new TWEEN.Tween({ left: cloudStart })
      .to({ left: cloudEnd }, time)
      .onUpdate(->
        cloud4.setAttribute 'transform', "translate(#{@left})"
      ).repeat(9999999).start()
    @cloud41Tween = new TWEEN.Tween({ left: cloudStart })
      .to({ left: cloudEnd }, time)
      .onUpdate(->
        cloud41.setAttribute 'transform', "translate(#{@left})"
      ).repeat(9999999).delay((time)/2).start()

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
              cabin[it.childMethod][it.childNode].setAttribute 'xlink:href', '#cabin2'
              cabin.isRotated = true
          else
            if cabin.isRotated
              cabin[it.childMethod][it.childNode].setAttribute 'xlink:href', '#cabin1'
              cabin.isRotated = false
          attr = "translate(#{x}, #{y}) rotate(#{angle or 0},38,23)"
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
              cabin[it.childMethod][it.childNode].setAttribute 'xlink:href', '#cabin2'
              cabin.isRotated = true
          else
            if cabin.isRotated
              cabin[it.childMethod][it.childNode].setAttribute 'xlink:href', '#cabin1'
              cabin.isRotated = false
          attr = "translate(#{x}, #{y}) rotate(#{angle or 0},38,23)"
          cabin.setAttribute 'transform', attr
      ).repeat(999999999999).start()

  animate:->
    requestAnimationFrame(@animate)
    TWEEN.update()

  isIE:->
    if @isIECache then return @isIECache
    undef = undefined # Return value assumes failure.
    rv = -1
    ua = window.navigator.userAgent
    msie = ua.indexOf("MSIE ")
    trident = ua.indexOf("Trident/")
    if msie > 0
      
      # IE 10 or older => return version number
      rv = parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10)
    else if trident > 0
      
      # IE 11 (or newer) => return version number
      rvNum = ua.indexOf("rv:")
      rv = parseInt(ua.substring(rvNum + 3, ua.indexOf(".", rvNum)), 10)
    @isIECache = (if (rv > -1) then rv else undef)
    @isIECache

  bind:(func, context) ->
    wrapper = ->
      args = Array::slice.call(arguments)
      unshiftArgs = bindArgs.concat(args)
      func.apply context, unshiftArgs
    bindArgs = Array::slice.call(arguments, 2)
    wrapper


new Main