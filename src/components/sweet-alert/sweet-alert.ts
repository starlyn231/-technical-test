import Swal from 'sweetalert2';
import './styles/sweet-alert.css';


export const SweetAlert = Swal.mixin({
  customClass: {
    title: 'title',
    container: 'message',
  },
  confirmButtonColor: ' #59bc7c',
});

export const Toast = SweetAlert.mixin({
  toast: true,
  position: 'top-end',
  iconColor: 'white',
  customClass: {
    container: 'container',
    popup: 'colored-toast',
  },
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true,
});

