/**
 * Todolist
 */
var app = {
  todoContainer: null,
  listContainer: null,
  tasks: [
    {
      title: 'Faire une todo-list en JS',
      done: true
    }, {
      title: 'Faire une todo-list en React',
      done: false
    }, {
      title: 'Coder facebook',
      done: false
    }
  ],

  init: () => {
    // On cible le container dans init pour le réutiliser dans toute l'app
    app.todoContainer = document.querySelector('#todo');
    // On vide le container pour recréer à chaque ajout de tâche
    app.todoContainer.innerHTML = '';
    // On crée le formulaire d'ajout d'une tâche
    app.createForm();
    // On crée le compteur de tâches
    app.createCount();
    // On crée la liste des tâches
    app.createList();
  },

  /**
   * Fonction permettant de créer le formulaire de création de tâche
   */
  createForm: () => {
    // On crée le form
    const form = document.createElement('form');
    // On lui ajoute une classe pour le styliser
    form.classList.add('add-task-form');
    // On ajoute un eventListener pour la soumission du formulaire
    form.addEventListener('submit', app.handleAddTaskForm);
    // Puis on crée un input
    const inputText = document.createElement('input');
    // On lui ajoute une classe pour le styliser
    inputText.classList.add('add-task-form__input');
    // On lui ajoute aussi le placeholder
    inputText.placeholder = 'Ajouter une tâche';
    // Et on l'ajoute au formulaire
    form.appendChild(inputText);
    // On ajout le formulaire à notre container principal
    app.todoContainer.appendChild(form);
  },

  /**
   * Fonction déclenchée à la soumission du formulaire d'ajout d'une tâche
   * @param {Event} event 
   */
  handleAddTaskForm: (event) => {
    // On annule le fonctionnement par défaut de l'event pour éviter que la page se recharge
    event.preventDefault();
    // On récupère le formulaire depuis la cible de l'évènement
    const form = event.target;
    // Depuis le formulaire on récupère la valeur de l'input
    const input = form.querySelector('input');
    // Et on récupère la valeur de l'input qui correspond au nom de la tâche
    const taskTitle = input.value;
    if (taskTitle.trim() === '') {
      alert('Attention le titre est vide');
      return false;
    }
    // Maintenant qu'on a le nom de la tâche, on l'ajoute
    app.tasks.push({ title: taskTitle });
    // On recharge toute l'interface avec les nouvelles données
    app.init();
  },

  /**
   * Fonction permettant de créer le compteur de tâches
   */
  createCount: () => {
    // On commence par créer le conteneur du compteur
    const counter = document.createElement('h2');
    // On ajoute la classe au block
    counter.classList.add('task-counter');
    // On récupère uniquement les tâches qui ne sont pas terminées
    const tasksInProgress = app.tasks.filter((task) => !task.done);
    // Et on rajoute le contenu textuel
    counter.textContent = `${tasksInProgress.length} tâche${tasksInProgress.length > 1 ? 's' : ''} en cours`;
    // On l'ajoute à notre container principal
    app.todoContainer.appendChild(counter);
  },

  /**
   * Fonction permettant de créer le listing des tâches
   */
  createList: () => {
    // On commence par créer le conteneur de liste
    app.listContainer = document.createElement('ul');
    // On lui ajoute une classe
    app.listContainer.classList.add('task-list');
    // et on l'ajoute au conteneur principal
    app.todoContainer.appendChild(app.listContainer);

    // On génère les tâches depuis le tableau de données
    app.tasks.forEach(app.generateTask);
  },

  /**
   * Fonction permettant d'ajouter une tâche de la liste
   * @param {Object} task 
   */
  generateTask: (task) => {
    // On créé l'élément tâche (un <li>)
    const taskEl = document.createElement('li');
    // Puis on lui ajoute la classe pour le styliser
    taskEl.classList.add('task');
    // Si la case est cochée je rajoute un modifier
    if (task.done) {
      taskEl.classList.add('task--checked');
    }
    // On rajoute un label pour accueillir le titre de la tâche
    const label = document.createElement('label');
    // On rajoute une classe
    label.classList.add('task__label');
    // On lui donne un titre
    label.textContent = task.title;

    // On crée l'input qui va devenir la checkbox
    const checkbox = document.createElement('input');
    // On lui rajoute une classe
    checkbox.classList.add('task__checkbox');
    // on la transforme en checkbox
    checkbox.type = 'checkbox';
    // on coche ou pas la checkbox en fonction du paramètre done
    checkbox.checked = task.done;
    // on ajoute une event listener au moment où on coche la case
    checkbox.addEventListener('change', () => {
      task.done = checkbox.checked;
      app.init();
    });
    // J'ajoute la checkbox dans le label
    label.prepend(checkbox);

    // J'ajoute le label dans ma tâche
    taskEl.appendChild(label);

    // Et pour finir j'ajoute ma tâche dans ma liste de tâches
    app.listContainer.appendChild(taskEl);
  },
};


// Chargement du DOM
document.addEventListener('DOMContentLoaded', app.init);
