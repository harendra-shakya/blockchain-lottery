// exports.executeScheduledTask = functions.firestore
//     .document("scheduledTasks/{taskId}")
//     .onUpdate(async (change, context) => {
//         const newData = change.after.data();
//         const scheduledTime = newData.scheduledTime.toDate();
//         const currentTime = new Date();

//         if (currentTime >= scheduledTime && !newData.completed) {
//             try {
//                 await fetch("http://localhost:3000/api/end-battle", {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({ battleId: context.params.taskId }),
//                 });

//                 // Mark the task as completed
//                 return change.after.ref.update({ completed: true });
//             } catch (error) {
//                 console.error("Error executing scheduled task:", error);
//                 // Handle the error if necessary
//             }
//         }

//         return null;
//     });

export const test = () => {
    console.log("testing");
};
