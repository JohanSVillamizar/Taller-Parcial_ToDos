document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll('.delete-btn');

    deleteButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const todoId = button.getAttribute('data-todo-id');

            // Mostrar SweetAlert2 para confirmar la eliminación
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: 'No podrás revertir esto!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar!'
            });

            // Si se confirma la eliminación
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`/todospanel/${todoId}`, {
                        method: 'DELETE'
                    });

                    if (!response.ok) {
                        throw new Error('Error al eliminar la tarea');
                    }

                    // Recargar la página después de eliminar
                    window.location.reload();
                } catch (error) {
                    console.error('Error:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al eliminar la tarea',
                        text: 'Por favor, intenta de nuevo más tarde.'
                    });
                }
            }
        });
    });
});
