import { Curtains, Plane } from 'curtainsjs';

// Sahneyi ayarla
const curtains = new Curtains({
    container: "canvas-container",
    pixelRatio: Math.min(1.5, window.devicePixelRatio)
});

// Su efekti için shader kodları (Basit dalgalanma)
const vs = `
    precision mediump float;
    attribute vec3 aVertexPosition;
    attribute vec2 aTextureCoord;
    uniform mat4 uMVMatrix;
    uniform mat4 uPMatrix;
    varying vec2 vTextureCoord;
    void main() {
        vTextureCoord = aTextureCoord;
        gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    }
`;

const fs = `
    precision mediump float;
    varying vec2 vTextureCoord;
    uniform sampler2D uSampler0;
    uniform float uTime;
    void main() {
        vec2 textureCoord = vTextureCoord;
        // Dalgalanma matematiği
        textureCoord.x += sin(textureCoord.y * 10.0 + uTime / 30.0) * 0.005;
        textureCoord.y += cos(textureCoord.x * 10.0 + uTime / 30.0) * 0.005;
        gl_FragColor = texture2D(uSampler0, textureCoord);
    }
`;

// Görseli sahneye ekle
const planeElement = document.createElement("div");
planeElement.style.width = "100%";
planeElement.style.height = "100%";
document.getElementById("canvas-container").appendChild(planeElement);

const params = {
    vertexShader: vs,
    fragmentShader: fs,
    uniforms: {
        time: {
            name: "uTime",
            type: "1f",
            value: 0,
        },
    },
};

const plane = new Plane(curtains, planeElement, params);

// Görseli yükle
const img = new Image();
img.src = "bground.JPG"; // Büyük/küçük harfe dikkat!
img.setAttribute("data-sampler", "uSampler0");
plane.loadImages([img]);

plane.onRender(() => {
    plane.uniforms.time.value++; // Dalgalanmayı hareket ettir
});
