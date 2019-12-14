class Accordion {
  constructor({ container, mainTitle, panels }) {
    this.container = container;
    this.mainTitle = mainTitle;
    this.panels = panels;
  }

  createMainTitle(title, wrapper) {
    if (!title) return null

    const UI_titleWrapper = document.createElement('h2');
    const UI_titleContent = document.createTextNode(title);
    UI_titleWrapper.appendChild(UI_titleContent);

    wrapper.appendChild(UI_titleWrapper);
  }

  createPanels(items, wrapper) {
    if (!items) return null

    const UI_PanelsWrapper = document.createElement('ul');
    
    items.forEach(({ title, subtitle, content }) => {
      if (!title && !content) return null

      const UI_PanelWrapper = document.createElement('li');

      // create and add title <h3>
      const UI_PanelTitleWrapper = document.createElement('h3');
      const UI_PanelTitleContent = document.createTextNode(title);
      UI_PanelTitleWrapper.appendChild(UI_PanelTitleContent);

      // create and add content wrapper
      const UI_PanelContentWrapper = document.createElement('div');
      UI_PanelContentWrapper.insertAdjacentHTML('beforeend', content);
      UI_PanelContentWrapper.classList.add('accordion__content');

      // create heading wrapper
      const UI_PanelHeaderWrapper = document.createElement('header');
      UI_PanelHeaderWrapper.classList.add('accordion__header');

      // append title to its wrapper
      UI_PanelHeaderWrapper.appendChild(UI_PanelTitleWrapper)
      
      if ( subtitle ) {        
        // create and add subtitle <h4>
        const UI_PanelSubTitleWrapper = document.createElement('h4');
        const UI_PanelSubTitleContent = document.createTextNode(subtitle);
        UI_PanelSubTitleWrapper.appendChild(UI_PanelSubTitleContent)
        
        // append subtitle to <header>
        UI_PanelHeaderWrapper.appendChild(UI_PanelSubTitleWrapper)
      }

      // append header to </li>
      UI_PanelWrapper.appendChild(UI_PanelHeaderWrapper);
      // append content to </li>
      UI_PanelWrapper.appendChild(UI_PanelContentWrapper)

      // add item to <ul>
      UI_PanelsWrapper.appendChild(UI_PanelWrapper);
    });

    // add <ul> to accordion
    wrapper.appendChild(UI_PanelsWrapper);
  }

  handleClick() {
    this.parentElement.classList.toggle('accordion--is-active');
  }

  createAccordion() {
    const UI_accordion = document.getElementById(this.container);
    
    this.createMainTitle(this.mainTitle, UI_accordion);
    this.createPanels(this.panels, UI_accordion)

    const UI_accordionItems = UI_accordion.querySelectorAll('li');
    UI_accordionItems.forEach(item => {
      const header = item.querySelector('header');
      header.addEventListener('click', this.handleClick);
    })
  }

  init() {
    console.log('[ACCORDION] initialized')
    this.createAccordion();
  }
};