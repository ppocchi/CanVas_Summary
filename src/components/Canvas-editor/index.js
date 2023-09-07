import React, { Component } from "react";
import { fabric } from "fabric";
import { connect } from "react-redux";
import { setCanvas } from "../../Actions/editor";

class canvasEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canvas: null,
      backgroundColor: "#FDEFEF",
      fontSize: "24",
      href: "",
      color: "#000000",
      canvasScale: 1,
      backgroundImage: ""
    };
    this.container = React.createRef();
  }

  componentDidMount() {
    const container = this.container.current;
    const { clientHeight, clientWidth } = container;

    const canvas = new fabric.Canvas("canvas", {
      backgroundColor: "#F0F0F0",
      height: clientHeight,
      width: clientWidth,
      preserveObjectStacking: true
    });

    this.props.setCanvas({ canvas });
    this.setState({ canvas });

    document.addEventListener("keydown", this.onHandleKeyDown);
  }

  onHandleKeyDown = (event) => {
    if (event.which === 8) {
      this.deleteActiveObject();
    }
  };

  addText = () => {
    const { canvas } = this.state;
    canvas.add(
      new fabric.IText("Tap and Type", {
        fontFamily: "arial",
        fill: this.state.color,
        fontSize: 29,
        padding: 5,
        left: 0,
        right: 0
      })
    );
  };

  textColorChange = (e) => {
    const { canvas } = this.state;
    if (canvas.getActiveObject()) {
      canvas.getActiveObject().set("fill", e.target.value);
      canvas.renderAll();
    }
    this.setState({ color: e.target.value });
  };

  deleteActiveObject = () => {
    const { canvas } = this.state;

    canvas.getActiveObjects().forEach((object) => {
      canvas.remove(object);
    });
  };

  staticText = (item) => {
    return new Promise((resolve, reject) => {
      try {
        const baseOptions = this.getBaseOptions(item, "text");
        const metadata = item.metadata;
        const oldCanvasWidth = item.canvas.width;
        const newCanvasWidth = this.state.canvas.width;
        const {
          textAlign,
          fontFamily,
          fontSize,
          fontWeight,
          charSpacing,
          lineheight,
          text,
          padding
        } = metadata;
        const textOptions = {
          ...baseOptions,
          text: text ? text : "Default Text",
          ...(textAlign && { textAlign }),
          ...(fontFamily && { fontFamily }),
          ...(fontSize && {
            fontSize: (fontSize * newCanvasWidth) / oldCanvasWidth
          }),
          ...(fontWeight && { fontWeight }),
          ...(charSpacing && { charSpacing }),
          ...(lineheight && { lineheight }),
          ...(padding && { padding })
        };
        const element = new fabric.StaticText(textOptions);
        resolve(element);
      } catch (err) {
        reject(err);
      }
    });
  };

  getBaseOptions(item, type) {
    const { left, top, width, height, scaleX, scaleY } = item;
    let metadata = item.metadata ? item.metadata : {};
    const { fill, angle, originX, originY } = metadata;
    const oldCanvasWidth = item.canvas.width;
    const oldCanvasHeight = item.canvas.height;
    const newCanvasWidth = this.state.canvas.width;
    const newCanvasHeight = this.state.canvas.height;

    let baseOptions = {
      angle: angle ? angle : 0,
      top: top ? (top * newCanvasWidth) / oldCanvasWidth : 0,
      left: left ? (left * newCanvasWidth) / oldCanvasWidth : 0,
      width: type === "img" ? width : (width * newCanvasWidth) / oldCanvasWidth,
      height:
        type === "img" ? height : (height * newCanvasHeight) / oldCanvasHeight,
      originX: originX || "left",
      originY: originY || "top",
      scaleX: (scaleX * newCanvasWidth) / oldCanvasWidth || 1,
      scaleY: (scaleY * newCanvasWidth) / oldCanvasWidth || 1,
      fill: fill || "#000000",
      metadata: metadata
    };
    return baseOptions;
  }

  render() {
    return (
      <div id="Canvas">
        <button onClick={this.addText}>Add Text </button>
        <div>
          <label>Text color </label>
          <input
            type="color"
            value={this.state.color}
            size="10"
            onChange={(e) => this.textColorChange(e)}
          />{" "}
        </div>
        <div>
          <canvas
            id="canvas"
            style={{
              width: "100%",
              height: "100%",
              border: "2px solid black",
              margin: "auto"
            }}
            ref={this.container}
          ></canvas>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    editorState: state.editor
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setCanvas: (data) => {
      return dispatch(setCanvas(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(canvasEditor);