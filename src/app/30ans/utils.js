import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export const copyToClipboard = (text) => {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";  // To avoid scrolling to bottom of page in MS Edge.
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);

  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand('copy');
    const msg = successful ? 'Le texte d\'invitation a été copié dans le presse-papier.' : 'Échec de la copie du texte';
    showToast(msg);
  } catch (err) {
    console.error('Erreur lors de la copie du texte :', err);
    showToast('Erreur lors de la copie du texte');
  }

  document.body.removeChild(textArea);
};

export const showToast = (message) => {
  Toastify({
    text: message,
    duration: 3000,
    close: false,
    gravity: "center",
    position: "center",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #E000B8, #E0B0B8)",
      textAlign: "center",
      marginLeft: "15px",
      marginRight: "15px",
      borderRadius: "10px",
    },
  }).showToast();
};

export const isMobileDevice = () => {
  return /Mobi|Android/i.test(navigator.userAgent);
};
