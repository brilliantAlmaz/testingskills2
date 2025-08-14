document.addEventListener("DOMContentLoaded", () => {


   // insert data in table

   // get data from localstorage
   let md;


   if (localStorage.getItem('main_data')) {
      md = JSON.parse(localStorage.getItem('main_data'))
   } else {
      localStorage.setItem('main_data', JSON.stringify(data))
      md = JSON.parse(localStorage.getItem('main_data'))
   }
   //console.log(md);

   displayData();



   // for underthemes
   // IMPORTANT ! ! ! 
   document.querySelector('.content__col._undertheme').insertAdjacentHTML('beforeend',
      `<div class="add add-undertheme"><span>Добавить</span></div>`
   )


   document.querySelector('.content__col._text').insertAdjacentHTML('beforeend',
      `<div class="add add-text"><span>Добавить</span></div>`
   )
   const addUndertheme = document.querySelector('.add-undertheme');
   const addText = document.querySelector('.add-text')
   addText.addEventListener('click', () => {
      const theTheme = addText.dataset.theme;
      const theUndertheme = addText.dataset.undertheme;

      switch (theTheme) {
         case "1":
            // deals
            let contactsArray = md.deals.find(function (d) {
               return d.id == theUndertheme;
            })
            let fullContacts = md.contacts.map(i => i.id);

            //console.log(contactsArray.contacts, fullContacts);
            if (!arraysEqual(fullContacts, contactsArray.contacts)) {
               if (document.querySelector('.text-info'))
                  document.querySelector('.text-info').remove();
               document.querySelector(`.text__item[data-undertheme="${theUndertheme}"][data-theme="${theTheme}"]`).insertAdjacentHTML('beforeend',

                  `<div class="text__key text-add-bond">Выберите контакт</div>
                  <div class="text__value text-add-bond" style="min-height:40px;">
                  <select>
                  <option default>Выберите ID контакта</option></select>
                  </div>`
               );
               const contactIDs = fullContacts.filter(item => !contactsArray.contacts.includes(item));
               const selectHTML = document.querySelector(`.text__item[data-undertheme="${theUndertheme}"][data-theme="${theTheme}"] .text-add-bond select`)
               //console.log(contactIDs);
               contactIDs.forEach(item => {
                  const theClient = md.contacts.find(function (c) { return c.id == item });

                  selectHTML.insertAdjacentHTML('beforeend',
                     `<option value="${item}">ID: ${item}, ${theClient.client_name ? theClient.client_name : "Безымянный"} ${theClient.client_surname}</option>`)
               })
               selectHTML.addEventListener('input', () => {
                  //console.log(selectHTML.value);
                  if (selectHTML.value) {

                     document.querySelector(`.text__item[data-undertheme="${theUndertheme}"][data-theme="${theTheme}"] select`).remove();
                     document.querySelector(`.text__item[data-undertheme="${theUndertheme}"][data-theme="${theTheme}"] .text__key.text-add-bond`).textContent = "id контакта: " + selectHTML.value;

                     document.querySelector(`.text__item[data-undertheme="${theUndertheme}"][data-theme="${theTheme}"] .text__value.text-add-bond`).textContent = `${md.contacts.find(c => c.id == selectHTML.value).client_name ? md.contacts.find(c => c.id == selectHTML.value).client_name : "Безымянный"}  ${md.contacts.find(c => c.id == selectHTML.value).client_surname} `;

                     document.querySelector(`.text__item[data-undertheme="${theUndertheme}"][data-theme="${theTheme}"] .text__key.text-add-bond`).dataset.clientId = selectHTML.value
                     document.querySelector(`.text__item[data-undertheme="${theUndertheme}"][data-theme="${theTheme}"] .text__key.text-add-bond`).classList.remove('text-add-bond')

                     document.querySelector(`.text__item[data-undertheme="${theUndertheme}"][data-theme="${theTheme}"] .text__value.text-add-bond`).dataset.clientIdFullname = selectHTML.value
                     document.querySelector(`.text__item[data-undertheme="${theUndertheme}"][data-theme="${theTheme}"] .text__value.text-add-bond`).classList.remove('text-add-bond')


                     md.deals.find(function (d) {
                        return d.id == theUndertheme;
                     }).contacts.push(Number(selectHTML.value));

                     md.contacts.find(function (c) {
                        return c.id == Number(selectHTML.value)
                     }).deals.push(Number(theUndertheme))






                     document.querySelector(`.text__item[data-theme="2"][data-undertheme="${Number(selectHTML.value)}"]`).insertAdjacentHTML('beforeend',
                        `<div class="text__key" data-deal-id="${theUndertheme}">id сделки: <span>${theUndertheme}</span></div>
            <div class="text__value" data-deal-label-id="${theUndertheme}"><span>${md.deals.find(function (d) { return d.id == theUndertheme }).label ? md.deals.find(function (d) { return d.id == theUndertheme }).label : "Безымянная сделка"}</span></div>`
                     )




                     //console.log(md);
                     updateData(md);
                  }
               })




            } else {
               document.querySelector(`.text__item[data-undertheme="${theUndertheme}"][data-theme="${theTheme}"]`).insertAdjacentHTML('beforeend',
                  `<div class="text__key text-info"  style="min-height:40px;">Все доступные клиенты уже установлены</div>`
               )
            }
            break;

         case "2":
            // deals
            let dealsArray = md.contacts.find(function (c) {
               return c.id == theUndertheme;
            })
            let fullDeals = md.deals.map(i => i.id);

            //console.log(dealsArray.deals, fullDeals);
            if (!arraysEqual(fullDeals, dealsArray.deals)) {
               if (document.querySelector('.text-info'))
                  document.querySelector('.text-info').remove();
               document.querySelector(`.text__item[data-undertheme="${theUndertheme}"][data-theme="${theTheme}"]`).insertAdjacentHTML('beforeend',

                  `<div class="text__key text-add-bond">Выберите сделку</div>
                  <div class="text__value text-add-bond" style="min-height:40px;">
                  <select>
                  <option default>Выберите ID сделки</option></select>
                  </div>`
               );
               const dealIDs = fullDeals.filter(item => !dealsArray.deals.includes(item));
               const selectHTML = document.querySelector(`.text__item[data-undertheme="${theUndertheme}"][data-theme="${theTheme}"] .text-add-bond select`)
               //console.log(dealIDs);
               dealIDs.forEach(item => {
                  const theDeal = md.deals.find(function (c) { return c.id == item });

                  selectHTML.insertAdjacentHTML('beforeend',
                     `<option value="${item}">ID: ${item}, ${theDeal.label ? theDeal.label : "Безымянная сделка"}</option>`)
               })
               selectHTML.addEventListener('input', () => {
                  //console.log(selectHTML.value);
                  if (selectHTML.value) {

                     document.querySelector(`.text__item[data-undertheme="${theUndertheme}"][data-theme="${theTheme}"] select`).remove();
                     document.querySelector(`.text__item[data-undertheme="${theUndertheme}"][data-theme="${theTheme}"] .text__key.text-add-bond`).textContent = "id сделки: " + selectHTML.value;

                     document.querySelector(`.text__item[data-undertheme="${theUndertheme}"][data-theme="${theTheme}"] .text__value.text-add-bond`).textContent = `${md.deals.find(c => c.id == selectHTML.value).label} `;

                     document.querySelector(`.text__item[data-undertheme="${theUndertheme}"][data-theme="${theTheme}"] .text__key.text-add-bond`).dataset.dealId = selectHTML.value
                     document.querySelector(`.text__item[data-undertheme="${theUndertheme}"][data-theme="${theTheme}"] .text__key.text-add-bond`).classList.remove('text-add-bond')

                     document.querySelector(`.text__item[data-undertheme="${theUndertheme}"][data-theme="${theTheme}"] .text__value.text-add-bond`).dataset.dealLabelId = selectHTML.value
                     document.querySelector(`.text__item[data-undertheme="${theUndertheme}"][data-theme="${theTheme}"] .text__value.text-add-bond`).classList.remove('text-add-bond')


                     md.contacts.find(function (d) {
                        return d.id == theUndertheme;
                     }).deals.push(Number(selectHTML.value));

                     md.deals.find(function (c) {
                        return c.id == Number(selectHTML.value)
                     }).contacts.push(Number(theUndertheme))






                     document.querySelector(`.text__item[data-theme="1"][data-undertheme="${Number(selectHTML.value)}"]`).insertAdjacentHTML('beforeend',
                        `<div class="text__key" data-client-id="${theUndertheme}">id контакта: <span>${theUndertheme}</span></div>
            <div class="text__value" data-client-id-fullname="${theUndertheme}"><span>${md.contacts.find(function (d) { return d.id == theUndertheme }).client_name} ${md.contacts.find(function (d) { return d.id == theUndertheme }).client_surname}</span></div>`
                     )




                     //console.log(md);
                     updateData(md);
                  }
               })




            } else {
               document.querySelector(`.text__item[data-undertheme="${theUndertheme}"][data-theme="${theTheme}"]`).insertAdjacentHTML('beforeend',
                  `<div class="text__key text-info"  style="min-height:40px;">Все доступные сделки уже установлены</div>`
               )
            }
            break;
      }


   })


   addUndertheme.addEventListener('click', () => {
      const theTheme = addUndertheme.dataset.theme;



      let newDeal = {};
      let fullIds, newID;
      //console.log(theTheme);
      switch (theTheme) {
         case "1":
            document.querySelector('.add-text').style.display = "none";
            document.querySelector('.add-undertheme').textContent = "Сохранить";
            document.querySelector('.add-undertheme').style.background = "blue";
            document.querySelector('.add-undertheme').addEventListener('click', (e) => {
               e.preventDefault();
               window.location.href = "";
            })
            document.querySelectorAll('.theme__item').forEach(t => {
               t.style.pointerEvents = "none";
               t.style.background = "#dedede";
               t.setAttribute('contentEditable', 'false')

            })
            document.querySelectorAll('.undertheme__item').forEach(t => {
               t.style.pointerEvents = "none";
               t.style.background = "#dedede";
               t.setAttribute('contentEditable', 'false')
               t.querySelector('span').setAttribute('contentEditable', 'false')
            })

            fullIds = md.deals.map(i => i.id);
            newID = fullIds.sort()[fullIds.length - 1] + 1;
            document.querySelector('.content__col._undertheme').insertAdjacentHTML("beforeend",
               `<div style="min-height:40px;" contentEditable="false"  class="undertheme__item content__item shown active new-under" data-theme="${theTheme}"data-id="${newID}">Новая сделка</div>`
            );
            disactivateElems(document.querySelectorAll('.undertheme__item'));
            document.querySelector('.new-under').classList.add('active');
            hideElems(document.querySelectorAll('.text__item'))
            document.querySelector('.content__col._text').insertAdjacentHTML('beforeend',
               `<div class="text__item content__item shown" data-id="${newID}" data-undertheme="${newID}" data-theme="${theTheme}">
                   <div class="text__key">id сделки</div>
                   <div class="text__value">${newID}</div>

                   <div class="text__key">Наименование</div>
                   <div class="text__value" data-type="label" contenteditable="true"></div>

                   <div class="text__key">Сумма</div>
                   <div class="text__value" data-type="sum" contenteditable="true"></div>
               </div>`
            )
            newDeal.id = newID;
            newDeal.contacts = [];
            md.deals.push(newDeal)
            document.querySelectorAll(`.text__item[data-undertheme="${newID}"][data-theme="${theTheme}"] .text__value`).forEach(inp => {
               inp.addEventListener("keyup", () => {
                  md.deals.find(function (deal) { return deal.id == newID })[inp.dataset.type] = inp.textContent;
                  updateData(md)

               })
            })






            break;
         case "2":

            document.querySelector('.add-text').style.display = "none";
            document.querySelector('.add-undertheme').textContent = "Сохранить";
            document.querySelector('.add-undertheme').style.background = "blue";
            document.querySelector('.add-undertheme').addEventListener('click', (e) => {
               e.preventDefault();
               window.location.href = "";
            })

            document.querySelectorAll('.theme__item').forEach(t => {
               t.style.pointerEvents = "none";
               t.style.background = "#dedede";
               t.setAttribute('contentEditable', 'false')

            })
            document.querySelectorAll('.undertheme__item').forEach(t => {
               t.style.pointerEvents = "none";
               t.style.background = "#dedede";
               t.setAttribute('contentEditable', 'false')
               t.querySelector('span').setAttribute('contentEditable', 'false')
            })


            fullIds = md.contacts.map(i => i.id);
            newID = fullIds.sort()[fullIds.length - 1] + 1;
            document.querySelector('.content__col._undertheme').insertAdjacentHTML("beforeend",
               `<div style="min-height:40px;" contentEditable="false"  class="undertheme__item content__item shown active new-under" data-theme="${theTheme}"data-id="${newID}">Новый контакт</div>`
            );

            disactivateElems(document.querySelectorAll('.undertheme__item'));
            hideElems(document.querySelectorAll('.text__item'))
            document.querySelector('.new-under').classList.add('active');


            document.querySelector('.content__col._text').insertAdjacentHTML('beforeend',
               `<div class="text__item content__item shown" data-id="${newID}" data-undertheme="${newID}" data-theme="${theTheme}">
                   <div class="text__key">id контакта</div>
                   <div class="text__value">${newID}</div>

                   <div class="text__key">Имя</div>
                   <div class="text__value" data-type="client_name" contenteditable="true"></div>

                   <div class="text__key">Фамилия</div>
                   <div class="text__value" data-type="client_surname" contenteditable="true"></div>
               </div>`
            )
            newDeal.id = newID;
            newDeal.deals = [];
            md.contacts.push(newDeal)
            document.querySelectorAll(`.text__item[data-undertheme="${newID}"][data-theme="${theTheme}"] .text__value`).forEach(inp => {
               inp.addEventListener("keyup", () => {
                  md.contacts.find(function (contact) { return contact.id == newID })[inp.dataset.type] = inp.textContent;
                  updateData(md)

               })
            })
            break;
         default:
            break;
      }


   })
   function arraysEqual(arr1, arr2) {
      if (arr1.length !== arr2.length) {
         return false;
      }
      return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort());
   }


   //console.log(md);
   // editing items
   // deals
   document.querySelectorAll('.undertheme__item[data-theme="1"]').forEach(item => {
      item.addEventListener('keyup', () => {
         const theDeal = md.deals.find(function (deal) {
            return deal.id == item.dataset.id
         });
         theDeal.label = item.textContent;
         updateData(md);
         // front updates
         // update label 
         document.querySelectorAll(`.text__item[data-theme="1"][data-undertheme="${item.dataset.id}"] .text__value`)[1].
            textContent = item.textContent;
         // update sum
         document.querySelectorAll(`.text__item .text__value[data-deal-label-id="${theDeal.id}"]`).forEach(temp => temp.textContent = item.textContent)
      })
   })
   document.querySelectorAll('.text__item[data-theme="1"] .text__value').forEach(dealText => {
      dealText.addEventListener('keyup', () => {
         const newValue = dealText.textContent;
         const parentElem = dealText.parentNode;

         const theDeal = md.deals.find(function (deal) {
            return deal.id == parentElem.dataset.id;
         })
         switch (dealText.dataset.type) {
            case 'label':
               theDeal[dealText.dataset.type] = newValue;
               document.querySelector(`.undertheme__item[data-theme="1"][data-id="${parentElem.dataset.undertheme}"]`).textContent = newValue;
               document.querySelectorAll(`.text__item .text__value[data-deal-label-id="${theDeal.id}"]`).forEach(temp => temp.textContent = newValue)
               break;
            default:
               theDeal[dealText.dataset.type] = newValue;

               break;
         }

         updateData(md);
      })
   })


   // contacts
   document.querySelectorAll('.undertheme__item[data-theme="2"]').forEach(item => {
      item.addEventListener('keyup', () => {
         const theClient = md.contacts.find(function (client) {
            return client.id == item.dataset.id
         });

         const theName = item.textContent.split(' ')[0];
         const theSurname = item.textContent.split(' ')[1];

         //console.log(theClient);

         theClient.client_name = theName;
         theClient.client_surname = theSurname;
         //console.log(md);
         updateData(md);
         document.querySelectorAll(`.text__item .text__value[data-client-id-name="${theClient.id}"]`).forEach(temp => temp.textContent = theName);
         document.querySelectorAll(`.text__item .text__value[data-client-id-surname="${theClient.id}"]`).forEach(temp => temp.textContent = theSurname);

         document.querySelectorAll(`.text__item .text__value[data-client-id-fullname="${theClient.id}"]`).forEach(temp => temp.textContent = theName + " " + theSurname);
         // data-client-id-fullname
         // document.querySelectorAll(`.text__item .text__value[data-deal-label-id="${theDeal.id}"]`).forEach(temp => temp.textContent = item.textContent)
      })
   })
   document.querySelectorAll('.text__item[data-theme="2"] .text__value').forEach(dealText => {
      dealText.addEventListener('keyup', () => {
         const newValue = dealText.textContent;
         const parentElem = dealText.parentNode;

         const theDeal = md.deals.find(function (deal) {
            return deal.id == parentElem.dataset.id;
         })
         switch (dealText.dataset.type) {
            case 'label':
               theDeal[dealText.dataset.type] = newValue;
               document.querySelector(`.undertheme__item[data-theme="1"][data-id="${parentElem.dataset.undertheme}"]`).textContent = newValue;
               document.querySelectorAll(`.text__item .text__value[data-deal-label-id="${theDeal.id}"]`).forEach(temp => temp.textContent = newValue)
               break;
            default:
               theDeal[dealText.dataset.type] = newValue;

               break;
         }

         updateData(md);
      })
   })

   setEvents();

   document.querySelector('.theme__item').dispatchEvent(new Event('click'));
   // adding items







   function updateData(array) {
      localStorage.setItem('main_data', JSON.stringify(array));
   }

   function hideElems(elems) {
      elems.forEach(u => u.classList.remove('shown'))
   }
   function disactivateElems(elems) {
      elems.forEach(u => u.classList.remove('active'))
   }

   function setEvents() {
      const themes = document.querySelectorAll('.theme__item ');
      const underthemes = document.querySelectorAll('.undertheme__item')
      const texts = document.querySelectorAll('.text__item')
      const removeBtns = document.querySelectorAll('.remove');


      themes.forEach(theme => theme.addEventListener('click', () => {
         document.querySelectorAll('.add').forEach(add => add.dataset.theme = theme.dataset.id);
         // hideElems(document.querySelectorAll('.text-info'));
         // hide all items
         hideElems(texts)
         disactivateElems(texts)

         hideElems(underthemes)
         disactivateElems(underthemes)

         // remove all themese active state
         disactivateElems(themes)
         theme.classList.add('active');

         // add the clicked theme class 'active'
         // underthemes
         let firstUndertheme = false;
         underthemes.forEach(under => {
            if (under.dataset.theme == theme.dataset.id) {
               if (!firstUndertheme) {
                  under.dispatchEvent(new Event('click'))
                  firstUndertheme = true;
               }
               // show all underthemes that are linked to theme
               under.classList.add('shown');
            }
         })

      }))
      underthemes.forEach(under => under.addEventListener('click', () => {
         document.querySelector('.add-text').dataset.undertheme = under.dataset.id;

         disactivateElems(underthemes);
         under.classList.add('active');

         hideElems(texts);

         const textIndex = Array.from(texts).findIndex(txt => txt.dataset.undertheme == under.dataset.id && txt.dataset.theme == under.dataset.theme)

         texts[textIndex].classList.add('shown')
      }))

      removeBtns.forEach(btn => btn.addEventListener('click', () => {
         //console.log('remove!');
         const parentElem = btn.parentNode;
         const theTheme = parentElem.dataset.theme;

         // if removing the undertheme item
         if (parentElem.classList.contains('undertheme__item')) {
            // removing from data
            if (theTheme == 1) {
               // deals
               md.deals = md.deals.filter(function (deal) {
                  return deal.id != parentElem.dataset.id
               })
               md.contacts.forEach(c => {
                  //console.log(c);
                  c.deals = c.deals.filter(function (d) {
                     return d != parentElem.dataset.id;
                  })
               })
               //console.log(md);
               updateData(md);

               // remove the deal from contacts
               document.querySelectorAll(`.text__key[data-deal-id="${parentElem.dataset.id}"]`).forEach(t => t.remove());
               document.querySelectorAll(`.text__value[data-deal-label-id="${parentElem.dataset.id}"]`).forEach(t => t.remove());
            } else {
               // contacts

               md.contacts = md.contacts.filter(function (contact) {
                  return contact.id != parentElem.dataset.id
               })
               md.deals.forEach(d => {
                  //console.log(d);
                  d.contacts = d.contacts.filter(function (dItem) {
                     return dItem != parentElem.dataset.id;
                  })
               })
               //console.log(md);
               updateData(md);

               // remove the contact from deals

               document.querySelectorAll(`.text__key[data-client-id="${parentElem.dataset.id}"]`).forEach(t => t.remove());
               document.querySelectorAll(`.text__value[data-client-id-fullname="${parentElem.dataset.id}"]`).forEach(t => t.remove());
            }
            // removing items


            document.querySelector(`.undertheme__item[data-id="${parentElem.dataset.id}"][data-theme="${theTheme}"]`).remove();

            document.querySelectorAll(`.text__item[data-theme="${theTheme}"][data-undertheme="${parentElem.dataset.id}"]`).forEach(text => text.remove());
         }
         // if removeing text_item
         else {
            const parentestElem = parentElem.parentNode
            const theParentTheme = parentestElem.dataset.theme;
            //console.log(parentestElem);

            if (theParentTheme == 1) {
               // deals
               // md.deals = md.deals.filter(function (deal) {
               //    return deal.id != parentElem.dataset.id
               // })
               let deletedContactId = parentElem.dataset.clientIdFullname;
               md.deals.forEach(d => {
                  d.contacts = d.contacts.filter(function (cItem) {

                     return cItem != parentElem.dataset.clientIdFullname;
                  })

               })

               // const theDeal = md.deals.find(function (deal) {
               //    return deal.id = deletedDealId;
               // })
               // theDeal.contacts = theDeal.contacts.filter(function (contact) {
               //    return contact != parentestElem.dataset.undertheme
               // })
               const theClient = md.contacts.find(function (client) {
                  return client.id == deletedContactId;
               })
               //console.log(theClient);
               //console.log(parentestElem.dataset.undertheme);
               theClient.deals = theClient.deals.filter(function (deal) {
                  return deal != parentestElem.dataset.undertheme
               })
               //console.log(md);
               updateData(md);
               //console.log(parentestElem);
               document.querySelectorAll(`.text__item[data-theme="1"][data-undertheme="${parentestElem.dataset.undertheme}"] .text__key[data-client-id="${parentElem.dataset.clientIdFullname}"]`).forEach(t => t.remove());
               document.querySelectorAll(`.text__item[data-theme="1"][data-undertheme="${parentestElem.dataset.undertheme}"] .text__value[data-client-id-fullname="${parentElem.dataset.clientIdFullname}"]`).forEach(t => t.remove());

               document.querySelectorAll(`.text__item[data-theme="2"][data-undertheme="${deletedContactId}"] .text__key[data-deal-id="${parentestElem.dataset.undertheme}"]`).forEach(t => t.remove());
               document.querySelectorAll(`.text__item[data-theme="2"][data-undertheme="${deletedContactId}"] .text__value[data-deal-label-id="${parentestElem.dataset.undertheme}"]`).forEach(t => t.remove());


               // document.querySelectorAll(`.text__key[data-deal-id="${parentElem.dataset.id}"]`).forEach(t => t.remove());
               // document.querySelectorAll(`.text__value[data-deal-label-id="${parentElem.dataset.id}"]`).forEach(t => t.remove());
            } else {
               // contacts
               let deletedDealId = parentElem.dataset.dealLabelId
               md.contacts.forEach(c => {
                  //console.log(parentElem);
                  c.deals = c.deals.filter(function (dItem) {

                     return dItem != parentElem.dataset.dealLabelId;
                  })
                  //console.log(deletedDealId);

               })
               const theDeal = md.deals.find(function (deal) {
                  return deal.id == deletedDealId;
               })
               //console.log(theDeal);
               theDeal.contacts = theDeal.contacts.filter(function (contact) {
                  return contact != parentestElem.dataset.undertheme
               })
               //console.log(md);
               updateData(md);
               //console.log(parentestElem);
               document.querySelectorAll(`.text__item[data-theme="2"][data-undertheme="${parentestElem.dataset.undertheme}"] .text__key[data-deal-id="${parentElem.dataset.dealLabelId}"]`).forEach(t => t.remove());
               document.querySelectorAll(`.text__item[data-theme="2"][data-undertheme="${parentestElem.dataset.undertheme}"] .text__value[data-deal-label-id="${parentElem.dataset.dealLabelId}"]`).forEach(t => t.remove());

               document.querySelectorAll(`.text__item[data-theme="1"][data-undertheme="${deletedDealId}"] .text__key[data-client-id="${parentestElem.dataset.undertheme}"]`).forEach(t => t.remove());
               document.querySelectorAll(`.text__item[data-theme="1"][data-undertheme="${deletedDealId}"] .text__value[data-client-id-fullname="${parentestElem.dataset.undertheme}"]`).forEach(t => t.remove());
            }
         }
      }))


   }





   function displayData() {

      document.querySelectorAll('.content__col._undertheme .content__item').forEach(item => item.remove());
      document.querySelectorAll('.content__col._text .content__item').forEach(item => item.remove());

      // import lists
      md.deals.forEach(deal => {
         document.querySelector('.content__col._undertheme').insertAdjacentHTML(
            'beforeend',
            `<div class="undertheme__item content__item shown"
            
            data-id="${deal.id}" data-theme="1"><span contentEditable="true">${deal.label ? deal.label : "Безымянная сделка"}</span><span contentEditable="false" class="remove"></span>
             </div>`
         )
         // import deal data into _text
         document.querySelector('.content__col._text').insertAdjacentHTML(
            'beforeend',
            `<div class="text__item content__item shown" 
             data-id="${deal.id}" 
             data-undertheme="${deal.id}"
             data-theme="1">

                   <div class="text__key">id сделки</div>
                   <div class="text__value">${deal.id}</div>

                   <div class="text__key">Наименование</div>
                   <div class="text__value" data-type="label" contentEditable="true">${deal.label ? deal.label : "Безымянная сделка"}</div>

                   <div class="text__key">Сумма</div>
                   <div class="text__value" data-type="sum"  contentEditable="true">${deal.sum ? deal.sum : "Не указано"} </div>
             </div>`
         );
         deal.contacts.forEach(contact => {
            const client = md.contacts.find(function (c) {
               return c.id == contact;
            });
            document.querySelector(`.text__item[data-id='${deal.id}'][data-undertheme='${deal.id}'][data-theme="1"]`).insertAdjacentHTML('beforeend',
               `<div class="text__key" data-client-id="${client.id}">id контакта: ${client.id}</div>
            <div class="text__value" data-client-id-fullname="${client.id}"><span>${client.client_name ? client.client_name : "Безымянный"} ${client.client_surname ? client.client_surname : ""}</span> <span class="remove"></span></div>`);

         })
      })
      // import contacts
      md.contacts.forEach(contact => {
         document.querySelector('.content__col._undertheme').insertAdjacentHTML(
            'beforeend',

            `<div class="undertheme__item content__item shown" data-id="${contact.id}" data-theme="2" ><span contentEditable="true">${contact.client_name ? contact.client_name : "Безымянный "} ${contact.client_surname ? contact.client_surname : ""}</span>
               <span contentEditable="false" class="remove"></span></div>`
         )
         // import deal data into _text
         document.querySelector('.content__col._text').insertAdjacentHTML(
            'beforeend',
            `<div class="text__item content__item shown" 
             data-id="${contact.id}" 
             data-undertheme="${contact.id}"
             data-theme="2">

                   <div class="text__key">id контакта</div>
                   <div class="text__value">${contact.id}</div>

                   <div class="text__key" >Имя</div>
                   <div class="text__value" data-client-id-name="${contact.id}" contentEditable="true">${contact.client_name ? contact.client_name : "Безымянный"}</div>

                   <div class="text__key">Фамилия</div>
                   <div class="text__value" data-client-id-surname="${contact.id}" contentEditable="true">${contact.client_surname ? contact.client_surname : ""}</div>
             </div>`
         );
         contact.deals.forEach(deal => {
            const theDeal = md.deals.find(function (d) {
               return d.id == deal;
            });
            //console.log(theDeal);
            document.querySelector(`.text__item[data-id='${contact.id}'][data-undertheme='${contact.id}'][data-theme="2"]`).insertAdjacentHTML('beforeend',
               `<div class="text__key" data-deal-id="${theDeal.id}">id сделки: <span>${theDeal.id}</span></div>
            <div class="text__value" data-deal-label-id="${theDeal.id}"><span>${theDeal.label ? theDeal.label : "Безымянная"}</span><span class="remove"></span></div>`);

         })
      })
   }


})