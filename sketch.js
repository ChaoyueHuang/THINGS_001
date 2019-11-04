

var s1, gui, NumberControl,
VertexControl,
RadiusControl,
StepControl,
MaxStrokeWeightControl,
MinStrokeWeightControl,
ScaleControl,
FillModeControl,
ColorControl,
StartColorControl,
EndColorControl,
OffsetControl,
FlashControl,
SpeedControl,
MaxAmplitudeControl,
MinAmplitudeControl,
RandomControl;

window.onload = function() {
  gui = new dat.GUI();

  var f1 = gui.addFolder('Control');
  var f2 = gui.addFolder('Color');
  var f3 = gui.addFolder('Motion');

  f1.open();
  f2.open();
  f3.open();

  NumberControl = f1.add(params, 'Number', 1, 60);
  NumberControl.onChange(draw);

  VertexControl = f1.add(params, 'Vertex', 1, 100);
  VertexControl.onChange(draw);

  RadiusControl = f1.add(params, 'Radius', -500, 500);
  RadiusControl.onChange(draw);

  StepControl = f1.add(params, 'Step', 1, 10);
  StepControl.onChange(draw);

  MaxStrokeWeightControl = f1.add(params, 'MaxStrokeWeight', 0, 20);
  MaxStrokeWeightControl.onChange(draw);

  MinStrokeWeightControl = f1.add(params, 'MinStrokeWeight', 0, 20);
  MinStrokeWeightControl.onChange(draw);

  ScaleControl = f1.add(params, 'Scale', 0, 100);
  ScaleControl.onChange(draw);

  FillModeControl = f2.add(params, 'FillMode', (['Gradient','SolidColor']));
  FillModeControl.onChange(function() {
    if (params.FillMode == 'SolidColor') {
      type = 'SolidColor';
      draw();
    }
    else if (params.FillMode == 'Gradient') {
      type = 'Gradient';
      draw();
    }
  })

  ColorControl = f2.addColor(params, 'Color');
  ColorControl.onChange(draw);

  StartColorControl = f2.add(params, 'StartColor', -360, 0);
  StartColorControl.onChange(draw);

  EndColorControl = f2.add(params, 'EndColor', 0, 360);
  EndColorControl.onChange(draw);

  OffsetControl = f2.add(params, 'Offset', 0, 10);
  OffsetControl.onChange(draw);

  FlashControl = f3.add(params, 'Flash', 0.1, 10.0);
  FlashControl.onChange(draw);

  SpeedControl = f3.add(params, 'Speed', 3.0, 10.0);
  SpeedControl.onChange(draw);

  MaxAmplitudeControl = f3.add(params, 'MaxAmplitude', 0, 250);
  MaxAmplitudeControl.onChange(draw);

  MinAmplitudeControl = f3.add(params, 'MinAmplitude', -250, 0);
  MinAmplitudeControl.onChange(draw);

  RandomControl = gui.add(params, 'Random');
  //RandomControl.onChange(draw);

};

var setup = function() {

  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  //colorMode(HSB, 100);

  // params = new Params();
  // let gui = new dat.GUI();
  // var f1 = gui.addFolder('Control');
  // f1.add(params, 'Number', 1, 60);
  // f1.add(params, 'Vertex', 1, 100);
  // f1.add(params, 'Radius', -500, 500);
  // f1.add(params, 'Step', 1, 10);
  // f1.add(params, 'MaxStrokeWeight', 0, 20);
  // f1.add(params, 'MinStrokeWeight', 0, 20);
  // f1.add(params, 'Scale', 0, 100);
  //
  // var f2 = gui.addFolder('Color');
  // f2.addColor(params, 'Color');
  // f2.add(params, 'SolidColor');
  // f2.add(params, 'StartColor', -360, 0);
  // f2.add(params, 'EndColor', 0, 360);
  // f2.add(params, 'Offset', 0, 10);
  //
  // var f3 = gui.addFolder('Motion');
  // f3.add(params, 'Flash', 0.1, 10.0);
  // f3.add(params, 'Speed', 3.0, 10.0);
  // f3.add(params, 'MaxAmplitude', 0, 250);
  // f3.add(params, 'MinAmplitude', -250, 0);
  //
  // gui.add(params, 'Random');


  s1 = new Shape(width/2, height/2, 100);
  //gui.add(s1, 'num', 1, 20);
};

// plays or pauses the video depending on current state
var draw = function() {


  background(0);
  noFill();
    stroke(255,65);


    for (var i = 0; i < params.Number; i = i + params.Step) {
     var deg = millis()/params.Flash + i * 28 ;
     var rad = radians(deg);
     var len = sin(rad);
     var weight = map(len, -1.0, 1.0, params.MaxStrokeWeight, params.MinStrokeWeight);
     strokeWeight(weight);
     //stroke(params.Color, map(i,0,params.Number/0.9,0,100));

     //stroke(map(i,0,params.Number/0.7,0,360),100,100,50);
     if (params.FillMode == 'Gradient') {
      colorMode(HSB);
      stroke(map(i,0,params.Number/params.Offset,params.StartColor,params.EndColor),100,100,map(i,0,params.Number/0.9,0,100));

    }
    else if (params.FillMode == 'SolidColor'){
      colorMode(RGB);
      stroke(params.Color);
    }
     //ellipse(width/2,height/2,i*25,i*25);
     //drawPolygon(width/2,height/2,i*7,4);
     s1.display(params.Radius + i*params.Scale, params.Vertex);
    }
};

// var Params = function(){
//   this.Number = 25;
//   this.Vertex = 3.2;
//   this.Radius = 85;
//   this.Step = 1;
//   this.MaxStrokeWeight = 6;
//   this.MinStrokeWeight = 1;
//   this.Scale = 7;
//   this.SolidColor = false;
//   this.Color = "#ffae23";
//   this.StartColor = 0;
//   this.EndColor = 360;
//   this.Offset = 0.7;
//   this.Flash = 7.0;
//   this.Speed = 4.39;
//   this.MaxAmplitude = 135;
//   this.MinAmplitude = -250;
//
//   this.Random = function() {
//     this.Number = random(1,60);
//     this.Vertex = random(1,100);
//     this.Radius = random(-500,500);
//     this.Step = random(1,10);
//     this.MaxStrokeWeight = random(0,20);
//     this.MinStrokeWeight = random(0,20);
//     this.Scale = random(0,100);
//     // var ra = random(0,9);
//     // if (ra > 4) {
//     //   this.SolidColor = false;
//     // }
//     // else {
//     //   this.SolidColor = true;
//     // }
//     this.Solid = random([false, true]);
//     this.SolidColor.setValue(Solid);
//
//     this.Color = [ random(255), random(255), random(255) ];;
//
//     this.StartColor = random(-360,0);
//     this.EndColor = random(0,360);
//     this.Offset = random(0,10);
//     this.Flash = random(0.1, 10);
//     this.Speed = random(3,10);
//     this.MaxAmplitude = random(0,250);
//     this.MinAmplitude = random(-250,0);
//   };
// }

var params = {
  Number : 25,
  Vertex : 3.2,
  Radius : 85,
  Step : 1,
  MaxStrokeWeight : 6,
  MinStrokeWeight : 1,
  Scale : 7,
  FillMode: 'Gradient',
  Color : "#ffae23",
  StartColor : 0,
  EndColor : 360,
  Offset : 0.7,
  Flash : 7.0,
  Speed : 4.39,
  MaxAmplitude : 135,
  MinAmplitude : -250,


  Random : function() {
    var rNumber = random(1,60);
    NumberControl.setValue(rNumber);

    var rVertex = random(1,100);
    VertexControl.setValue(rVertex);

    var rRadius = random(-500,500);
    RadiusControl.setValue(rRadius);

    var rStep = random(1,10);
    StepControl.setValue(rStep);

    var rMaxStrokeWeight = random(0,20);
    MaxStrokeWeightControl.setValue(rMaxStrokeWeight);

    var rMinStrokeWeight = random(0,20);
    MinStrokeWeightControl.setValue(rMinStrokeWeight);

    var rScale = random(0,100);
    ScaleControl.setValue(rScale);

    var rFillMode = random(['Gradient','SolidColor']);
    FillModeControl.setValue(rFillMode);

    var rColor = [ random(255), random(255), random(255) ];
    ColorControl.setValue(rColor);

    var rStartColor = random(-360,0);
    StartColorControl.setValue(rStartColor);

    var rEndColor = random(0,360);
    EndColorControl.setValue(rEndColor);

    var rOffset = random(0,10);
    OffsetControl.setValue(rOffset);

    var rFlash = random(0.1, 10);
    FlashControl.setValue(rFlash);

    var rSpeed = random(3,10);
    SpeedControl.setValue(rSpeed);

    var rMaxAmplitude = random(0,250);
    MaxAmplitudeControl.setValue(rMaxAmplitude);

    var rMinAmplitude = random(-250,0);
    MinAmplitudeControl.setValue(rMinAmplitude);


}

};
