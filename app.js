class App {
  constructor() {


    const urlPathString = window.location.pathname;
    const parts = urlPathString.split('/');
    if (parts.length > 2 && parts[1] === 'id') {
      const diaryId = parts[2];
      this._showCardView(diaryId);
    } else {
      this._showCreateView();
    }




  }


  _showCreateView() {
      const viewContainer = document.querySelector('#creator-view');
      const creatorView = new CreatorView(viewContainer);
    }

    _showCardView(cardId) {
      const viewContainer = document.querySelector('#card-container');
      const cardView = new CardView(viewContainer, cardId);
    }
  }



/*
  async postEntry(event){
    event.preventDefault();
    console.log(this.newText);
    const params = {
      entry: this.newText
    }
    const fetchOptions = {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    };

    const result = await fetch('/saveEntry/', fetchOptions);
    const json = await result.json();
    this.entryId = json.entryId;
    console.log(json.diaryId);
    this._loadDiary();
  }

  async _loadEntry(event) {
      const result = await fetch('/getEntry/' + this.entryId);
      const json = await result.json();
      this.entry = json.entry;
      console.log(json.entry);
      this.diary.show(this.entryId, this.entry);
      //window.location.href = '/id/' + this.entryId;
  }
*/








}
