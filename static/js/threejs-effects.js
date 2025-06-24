class ThreeBackground {
    constructor() {
        this.container = document.getElementById('webgl-bg');
        if (!this.container) return;
        
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(this.renderer.domElement);
        
        this.addParticles();
        
        window.addEventListener('resize', () => this.onWindowResize(), false);
        
        this.animate();
    }
    
    addParticles() {
        const particles = 2500; 
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        const colors = [];
        const color = new THREE.Color();
        
        const baseColors = [
            [0.1, 1.0, 1.0],   
            [0.0, 1.0, 0.9],  
            [0.3, 1.0, 0.2]   
        ];
        
        for (let i = 0; i < particles; i++) {
            const radius = 800;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = radius * Math.cbrt(Math.random());
            
            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);
            
            positions.push(x, y, z);
            
            const baseColor = baseColors[Math.floor(Math.random() * baseColors.length)];
            
            const hue = Math.random() * 0.05 - 0.025; 
            const saturation = 0.9 + Math.random() * 0.1; 
            const lightness = 0.7 + Math.random() * 0.2;
            
            color.setHSL(
                (baseColor[0] + hue) % 1.0,
                saturation * baseColor[1],
                lightness * baseColor[2]
            );
            
            colors.push(color.r, color.g, color.b);
        }
        
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        
        const material = new THREE.PointsMaterial({
            size: 1.8, 
            vertexColors: true,
            transparent: true,
            opacity: 0.7,
            sizeAttenuation: true
        });
        
        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
        
        this.camera.position.z = 500;
    }
    
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        if (this.particles) {
            this.particles.rotation.x += 0.0001;
            this.particles.rotation.y += 0.0002;
        }
        
        this.renderer.render(this.scene, this.camera);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('webgl-bg')) {
        new ThreeBackground();
    }
});
