console.log('Archivo index.js cargado correctamente');

// Función para activar modo pantalla completa y landscape
function activateFullscreenLandscape() {
    console.log('Activando modo pantalla completa y landscape');
    const body = document.body;
    const gameContainer = document.querySelector('.game-container');
    const exitBtn = document.getElementById('exit-fullscreen-btn');
    
    // Agregar clase para modo pantalla completa
    body.classList.add('fullscreen-landscape');
    
    // Intentar activar pantalla completa nativa
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
    }
    
    // Mostrar botón de salir
    if (exitBtn) {
        exitBtn.style.display = 'block';
    }
    
    // Ocultar mensaje de orientación si existe
    const orientationMessage = document.getElementById('orientation-message');
    if (orientationMessage) {
        orientationMessage.style.display = 'none';
    }
}

// Función para salir del modo pantalla completa
function exitFullscreenLandscape() {
    const body = document.body;
    const exitBtn = document.getElementById('exit-fullscreen-btn');
    
    // Remover clase de modo pantalla completa
    body.classList.remove('fullscreen-landscape');
    
    // Salir de pantalla completa nativa
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
    
    // Ocultar botón de salir
    if (exitBtn) {
        exitBtn.style.display = 'none';
    }
}

// Función para manejar la orientación del dispositivo
function handleOrientation() {
    const orientationMessage = document.getElementById('orientation-message');
    const gameContainer = document.querySelector('.game-container');
    const body = document.body;
    
    // Si está en modo pantalla completa, no mostrar mensaje de orientación
    if (body.classList.contains('fullscreen-landscape')) {
        if (orientationMessage) orientationMessage.style.display = 'none';
        return;
    }
    
    // Detectar si es móvil
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // En móviles, verificar orientación
        if (window.innerHeight > window.innerWidth) {
            // Modo vertical (portrait) - mostrar mensaje
            if (orientationMessage) orientationMessage.style.display = 'flex';
            if (gameContainer) gameContainer.style.display = 'none';
        } else {
            // Modo horizontal (landscape) - mostrar contenido
            if (orientationMessage) orientationMessage.style.display = 'none';
            if (gameContainer) gameContainer.style.display = 'flex';
        }
    } else {
        // En desktop, mostrar siempre el contenido
        if (orientationMessage) orientationMessage.style.display = 'none';
        if (gameContainer) gameContainer.style.display = 'flex';
    }
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    handleOrientation();
    
    // Agregar event listener al botón de pantalla completa
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    if (fullscreenBtn) {
        console.log('Botón de pantalla completa encontrado');
        fullscreenBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Botón de pantalla completa clickeado');
            activateFullscreenLandscape();
        });
    } else {
        console.log('Botón de pantalla completa NO encontrado');
    }
    
    // Agregar event listener al botón de salir
    const exitBtn = document.getElementById('exit-fullscreen-btn');
    if (exitBtn) {
        exitBtn.addEventListener('click', exitFullscreenLandscape);
    }
});

// Escuchar cambios de orientación y tamaño de ventana
window.addEventListener('orientationchange', function() {
    setTimeout(handleOrientation, 100);
});

window.addEventListener('resize', function() {
    setTimeout(handleOrientation, 100);
});

// Escuchar cambios de pantalla completa
document.addEventListener('fullscreenchange', handleOrientation);
document.addEventListener('webkitfullscreenchange', handleOrientation);
document.addEventListener('msfullscreenchange', handleOrientation);
