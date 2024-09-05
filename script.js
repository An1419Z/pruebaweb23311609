function handleLogin(event) {
    event.preventDefault(); // Previene la acción por defecto del formulario

    var usuario = document.getElementById('usuario').value;
    var contrasena = document.getElementById('contrasena').value;

    // Enviar los datos al servidor usando fetch
    fetch('login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'usuario=' + encodeURIComponent(usuario) + '&contrasena=' + encodeURIComponent(contrasena)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            var destino;
            if (data.tipoUsuario === 'al') {
                destino = 'Alumnos/Alumno.html';
            } else if (data.tipoUsuario === 'dc') {
                destino = 'Docentes/Docente.html';
            } else if (data.tipoUsuario === 'ad') {
                destino = 'Administrativos/Administrativos.html';
            } else {
                alert('Usuario no válido');
                return;
            }
            window.location.href = destino;
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}