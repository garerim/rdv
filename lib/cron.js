const cron = require("node-cron");

const myCronTask = () => {
  envoieNotifRdv();
  rdvEstPasse();
};

const envoieNotifRdv = () => {
  fetch("http://localhost:3000/api/send-email/cronrdv")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        const emailData = {
          userEmail: item.userEmail,
          startDate: item.startDate,
          description: item.description,
          docName: item.docName,
        };

        fetch("http://localhost:3000/api/send-email/notifJourAvant", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
        });
      });
    })
    .catch((error) => {
      console.error("Error sending notification:", error);
    });
};

const rdvEstPasse = () => {
  fetch("http://localhost:3000/api/cron/rdvpasses");
};

cron.schedule("* * * * *", myCronTask);

console.log("Tâche cron configurée pour s'exécuter toutes les minutes");
