window.addEventListener("load", () => {
    // Sahneyi kur
    const curtains = new Curtains({
        container: "canvas-container"
    });

    // Su efekti ayarları (Shader)
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
            textureCoord.x += sin(textureCoord.y * 10.0 + uTime / 30.0) * 0.005;
            textureCoord.y += cos(textureCoord.x * 10.0 + uTime / 30.0) * 0.005;
            gl_FragColor = texture2D(uSampler0, textureCoord);
        }
    `;

    // Görseli HTML'e ve sahneye bağla
    const planeElement = document.getElementById("canvas-container");
    const img = new Image();
    img.src = "bground.JPG"; 
    img.setAttribute("data-sampler", "uSampler0");
    planeElement.appendChild(img);

    const params = {
        vertexShader: vs,
        fragmentShader: fs,
        uniforms: {
            time: { name: "uTime", type: "1f", value: 0 },
        },
    };

    const plane = new Plane(curtains, planeElement, params);

    plane.onRender(() => {
        plane.uniforms.time.value++;
    });
});
