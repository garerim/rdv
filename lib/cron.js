const cron = require("node-cron");

const myCronTask = () => {
  rdvEstPasse();
  envoieNotifRdv();
};

const envoieNotifRdv = () => {
  fetch("http://localhost:3000/api/send-email/cronrdv")
    .then((response) => {
      response.json().then((data) => {
        fetch("http://localhost:3000/api/send-email/notifJourAvant", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
            console.log("Email envoyé");
          })
          .catch((error) => {
            console.error("Erreur lors de l'envoi de l'email");
          });
      });
    })
    .catch((error) => {
      console.error("Erreur lors de l'envoi de l'email");
    });
};

const rdvEstPasse = () => {
  fetch("http://localhost:3000/api/cron/rdvpasses").then(
    console
      .log("rdvs updated")
      .catch(console.log("error while updating rdvs statut"))
  );
};

cron.schedule("* * * * *", myCronTask);

console.log("Tâche cron configurée pour s'exécuter toutes les minutes");
