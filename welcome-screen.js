class WelcomeScreen {
  constructor(containerElement) {






        const welcomeElement = document.querySelector('#welcome');
        const diaryElement = document.querySelector('#diary');
        const saveElement = document.querySelector('#save');

        this.welcome = new WelcomeScreen(welcomeElement);
        this.diary = new DiaryScreen(diaryElement);

        this.footer = document.querySelector('#footer');
        this.text = document.querySelector('#text');
        this.check = document.querySelector('#save');

        this.post = this.post.bind(this);
        this._loadDiary = this._loadDiary.bind(this);
        //this.postEntry = this.postEntry.bind(this);
        //this._loadEntry = this._loadEntry.bind(this);
        this.welcomeClick = this.welcomeClick.bind(this);
        this.save = this.save.bind(this);
        this.edit = this.edit.bind(this);
        //this.writeEntry = this.writeEntry.bind(this);
        this.newText = '';
        this.upsertEntry = this.upsertEntry.bind(this);


        document.addEventListener('create', this.welcomeClick);
        saveElement.addEventListener('click', this.save);
        this.text.addEventListener('click', this.edit);





    this.containerElement = containerElement;
    const create = document.querySelector('#create');
    this.create = this.create.bind(this);
    create.addEventListener('click', this.create);

  }

  welcomeClick(event){
      console.log('created');

      this.welcome.hide();
      //this.postEntry();

      this.post(event);
    }


  show(){
    this.containerElement.classList.remove('inactive');
  }

  hide(){
    this.containerElement.classList.add('inactive');
  }

  create(event){
    document.dispatchEvent(new CustomEvent('create'));
  }

}
