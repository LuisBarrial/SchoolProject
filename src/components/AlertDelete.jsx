import Swal from "sweetalert2";

export const showAlertDelete = (id, deleteData, isClassNameDark) => {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "Una vez eliminado, no se podrá recuperar",
    icon: "warning",
    showCancelButton: true,
    customClass: isClassNameDark,
  }).then(async (willDelete) => {
    if (willDelete.isConfirmed) {
      await Swal.fire({
        title: "Eliminado",
        text: "Eliminado con éxito",
        icon: "success",
        showConfirmButton: false,
        customClass: isClassNameDark,
        timer: 1000,
      });
      deleteData(id);
      console.log("eliminado");
    } else if (willDelete.dismiss === Swal.DismissReason.cancel) {
      Swal.fire({
        title: "Cancelado",
        text: "Tu Elemento está seguro :)",
        icon: "info",
        customClass: isClassNameDark,
      });
    }
  });
};
