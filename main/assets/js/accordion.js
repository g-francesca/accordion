class Accordion {
  constructor({ container, mainTitle, panels }) {
    this.container = container;
    this.mainTitle = mainTitle;
    this.panels = panels;
  }

  createAccordionElement(element, parent) {
    if (!element) return null

    const { htmlTag, content, className } = element;

    const UI_wrapper = document.createElement(htmlTag);
    const UI_content = document.createTextNode(content);

    UI_wrapper.appendChild(UI_content);
    UI_wrapper.classList.add(className);

    parent.appendChild(UI_wrapper);
    return UI_wrapper;
  }

  createMainTitle(accordion) {
    return this.createAccordionElement({ 
      htmlTag: 'h2',
      content: this.mainTitle,
      className: 'accordion__title'
    }, accordion);
  }

  createPanels(items, accordion) {
    if (!items) return null

    // create list of items
    const UI_itemsList = this.createAccordionElement({ 
      htmlTag: 'ul',
      content: '',
    }, accordion);
    
    // iterate through items to populate list
    items.forEach(({ title, subtitle, content }) => {
      if (!title || !content) return null

      // add item
      const UI_item = this.createAccordionElement({ 
        htmlTag: 'li',
        content: '',
        className: 'accordion__item'
      }, UI_itemsList);

      // add item head
      const UI_itemHeader = this.createAccordionElement({ 
        htmlTag: 'header',
        content: '',
        className: 'accordion__item__header'
      }, UI_item);

      // add title to item head
      this.createAccordionElement({ 
        htmlTag: 'h3',
        content: title,
      }, UI_itemHeader);

      // add icon to item head
      this.createAccordionElement({ 
        htmlTag: 'i',
        content: 'keyboard_arrow_down',
        className: 'material-icons'
      }, UI_itemHeader);
      
      // add subtitle to item head
      if ( subtitle ) {
        this.createAccordionElement({ 
          htmlTag: 'h4',
          content: subtitle,
        }, UI_itemHeader);
      }

      // add item content
      const UI_itemContent = this.createAccordionElement({ 
        htmlTag: 'div',
        content: '',
        className: 'accordion__item__content'
      }, UI_item);

      UI_itemContent.insertAdjacentHTML('beforeend', content);
    });
  }

  createAccordion(accordion) {    
    this.createMainTitle(accordion);
    this.createPanels(this.panels, accordion);
  }

  toggleClass() {
    this.parentElement.classList.toggle('accordion__item--is-active');
  }

  handleClick(accordion) {
    const UI_accordionItems = accordion.querySelectorAll('li');
    
    UI_accordionItems.forEach(item => {
      const header = item.querySelector('header');
      header.addEventListener('click', this.toggleClass);
    })
  }

  init() {
    console.log('[ACCORDION] initialized');
    const UI_accordion = document.getElementById(this.container);
    
    this.createAccordion(UI_accordion);
    this.handleClick(UI_accordion);
  }
};