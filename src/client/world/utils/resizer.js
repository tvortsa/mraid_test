export function resizer (container, camera, renderer) {
    
        // соотношение размеров камеры
        camera.aspect = container.clientWidth / container.clientHeight;
    
        // апдейт пирамиды зрения камеры
        camera.updateProjectionMatrix();
    
        // апдейт размера рендера И canvas
        renderer.setSize(container.clientWidth, container.clientHeight);
    
        // соотношение пикселя (для мобильных)
        renderer.setPixelRatio(window.devicePixelRatio);
}