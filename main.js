window.addEventListener("load", () => {
    // 1. Sahneyi kur
    const curtains = new Curtains({
        container: "canvas-container"
    });

    // 2. Shader Kodları
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

    // 3. Plane ve Görsel Yükleme
    const planeElement = document.getElementById("canvas-container");
    
    const params = {
        vertexShader: vs,
        fragmentShader: fs,
        uniforms: {
            time: { name: "uTime", type: "1f", value: 0 },
        },
    };

    const plane = new Plane(curtains, planeElement, params);

    // Görseli GitHub yoluna göre ekliyoruz
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "bground.JPG"; // Eğer dosya adın küçük harfse "bground.jpg" yap
    
    img.onload = () => {
        plane.loadImages([img]);
    };

    plane.onRender(() => {
        plane.uniforms.time.value++;
    });
});
