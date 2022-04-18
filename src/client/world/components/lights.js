
const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.3);
    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 50, 0);