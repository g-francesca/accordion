class Accordion {
  constructor({ container, mainTitle, panels }) {
    this.container = container;
    this.mainTitle = mainTitle;
    this.panels = panels;
  }

  _createAccordionElement(element, parent) {
    if (!element) return null

    const { htmlTag, content, className } = element;

    const UI_wrapper = document.createElement(htmlTag);
    const UI_content = document.createTextNode(content);

    UI_wrapper.appendChild(UI_content);

    if ( className ) UI_wrapper.classList.add(className);

    parent.appendChild(UI_wrapper);
    return UI_wrapper;
  }

  _createMainTitle(accordion) {
    return this._createAccordionElement({ 
      htmlTag: 'h2',
      content: this.mainTitle,
      className: 'accordion__title'
    }, accordion);
  }

  _createPanels(items, accordion) {
    if (!items) return null

    // create list of items
    const UI_itemsList = this._createAccordionElement({ 
      htmlTag: 'ul',
      content: '',
    }, accordion);
    
    // iterate through items to populate list
    items.forEach(({ title, subtitle, content }) => {
      if (!title || !content) return null

      // add item
      const UI_item = this._createAccordionElement({ 
        htmlTag: 'li',
        content: '',
        className: 'accordion__item'
      }, UI_itemsList);

      // add item head
      const UI_itemHeader = this._createAccordionElement({ 
        htmlTag: 'header',
        content: '',
        className: 'accordion__item__header'
      }, UI_item);

      // add title to item head
      this._createAccordionElement({ 
        htmlTag: 'h3',
        content: title,
      }, UI_itemHeader);

      // add icon to item head
      this._createAccordionElement({ 
        htmlTag: 'i',
        content: 'keyboard_arrow_down',
        className: 'material-icons'
      }, UI_itemHeader);
      
      // add subtitle to item head
      if ( subtitle ) {
        this._createAccordionElement({ 
          htmlTag: 'h4',
          content: subtitle,
        }, UI_itemHeader);
      }

      // add item content
      const UI_itemContent = this._createAccordionElement({ 
        htmlTag: 'div',
        content: '',
        className: 'accordion__item__content'
      }, UI_item);

      UI_itemContent.insertAdjacentHTML('beforeend', content);
    });
  }

  _createAccordion(accordion) {    
    this._createMainTitle(accordion);
    this._createPanels(this.panels, accordion);
  }

  _toggleClass() {
    this.parentElement.classList.toggle('accordion__item--is-active');
  }

  _handleClick(accordion) {
    const UI_accordionItems = accordion.querySelectorAll('li');
    
    UI_accordionItems.forEach(item => {
      const header = item.querySelector('header');
      header.addEventListener('click', this._toggleClass);
    })
  }

  init() {
    console.log('[ACCORDION] initialized');
    const UI_accordion = document.getElementById(this.container);
    
    this._createAccordion(UI_accordion);
    this._handleClick(UI_accordion);
  }
};