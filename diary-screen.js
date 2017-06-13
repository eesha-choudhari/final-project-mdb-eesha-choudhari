class DiaryScreen {
  constructor(containerElement, diaryId) {






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
    this.diaryId = diaryId;
    const today = new Date();
    const options = { month: 'long', day: 'numeric' };
    this.today = today.toLocaleDateString('en-US', options);
    this.curr = this.today;
    this.href = '';
  }



  show(diaryId, entries){
    console.log('here');
    this.entries = entries;
    this.containerElement.classList.remove('inactive');

    const footer = document.querySelector('#footer');
    const text = document.querySelector('#text');
    footer.classList.remove('inactive');
    text.classList.remove('inactive');
    const dateElement = document.querySelector('#date');
    dateElement.innerHTML = this.curr;
    const promptElement = document.querySelector('#prompt');
    promptElement.innerHTML = PROMPTS[parseInt(this.curr.slice(-2))];
    const textElement = document.querySelector('#text');
    textElement.innerHTML = entries;

  }

  hide(){
    this.containerElement.classList.add('inactive');
  }

  next(){
    const tomorrow = new Date();
    tomorrow.setDate(this.curr.getDate() + 1);
    console.log(tomorrow.toLocaleDateString('en-US', options));
    this.prompt = PROMPTS[parseInt(this.curr.slice(-2))];
    this.curr = tomorrow;

  }

  previous(){
    const yesterday = new Date();
    yesterday.setDate(this.curr.getDate() + 1);
    console.log(yesterday.toLocaleDateString('en-US', options));
    this.prompt = PROMPTS[parseInt(this.curr.slice(-2))];
    this.curr = yesterday;

  }


  async post(event){
    event.preventDefault();
    console.log(this.newText);
    const params = {
      entries: this.newText
    }
    const fetchOptions = {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    };

    const result = await fetch('/id/', fetchOptions);
    const json = await result.json();
    this.diaryId = json.diaryId;
    console.log(json.diaryId);
    //window.location.href = '/id/' + this.diaryId;
    this._loadDiary();
  }

  async _loadDiary(event) {
      const result = await fetch('/id/' + this.diaryId);
      const json = await result.json();
      this.entries = json.entries;
      this.diary.show(this.diaryId, this.entries);
      console.log(this.entries);
  }

  edit(event){
    this.check.classList.remove('inactive');
    this.footer.classList.add('inactive');
  }

  save(event){
    this.check.classList.add('inactive');
    this.footer.classList.remove('inactive');
    this.newtext = this.text.value;
    console.log(this.newtext);
    this.upsertEntry();
  }

  async upsertEntry() {
    event.preventDefault();

    const data = {
      diaryId: this.diaryId,
      entries: this.newtext
    };

    const fetchOptions = {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    const result = await fetch('/ups', fetchOptions);
    const json = await result.json();
    this.entries = json.entries;
    this._loadDiary();
  }




}
