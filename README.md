## The Golden Rule:

🦸 🦸‍♂️ `Stop starting and start finishing.` 🏁

If you work on more than one feature at a time, you are guaranteed to multiply your bugs and your anxiety.

## Making a plan

1. **Make a drawing of your app. Simple "wireframes"**
1. **Once you have a drawing, name the HTML elements you'll need to realize your vision**
1. **For each HTML element ask: Why do I need this?**
1. **Once we know _why_ we need each element, think about how to implement the "Why" as a "How"**
1. **Find all the 'events' (user clicks, form submit, on load etc) in your app. Ask one by one, "What happens when" for each of these events. Does any state change?**
1. **Think about how to validate each of your features according to a Definition of Done**
1. **Consider what features _depend_ on what other features. Use this dependency logic to figure out what order to complete tasks.**

Additional considerations:

- Ask: which of your HTML elements need to be hard coded, and which need to be dynamically generated?
- Consider your data model.
  - What kinds of objects (i.e., Dogs, Friends, Todos, etc) will you need?
  - What are the key/value pairs?
  - What arrays might you need?
  - What needs to live in a persistence layer?
- Is there some state we need to initialize?
- Ask: should any of this work be abstracted into functions? (i.e., is the work complicated? can it be resused?)

## Grading Rubric

| User should be able to . . .                                                         |             |
| :----------------------------------------------------------------------------------- | ----------: |
| Visit the deployed pages on GitHub pages, with link in the About section of the Github repo |    1 |
| See bought items styled differently from unbought items                                   |        1 |

| Events                                                                                |             |
| :----------------------------------------------------------------------------------- | ----------: |
| On the home page (`'/'`), Login and Signup using the login and signup form. On success, redirect to the `/list` page   |        1 |
| Logout by clicking the logout button                                                       |       1 |
| If a non-logged-in user tries to visit the list page, redirect them to the login page     |       1 |
| On the list page load event, fetch the list itemss from supabase and render them to the page. Note that list items should have a quantity and an item name. Call your `fetchAndDisplayList()` function to do this work.        |        2 |
| Add a list item to supabase by using the input and button.                                     |        2 |
| When a list item is added, clear out the shopping list and render the updated list of shopping items.       |        2 |
| When a user clicks a list item, it becomes bought. Update this state in supabase, clear out the shopping list, and re-fetch and redisplay the updated items. Call your `fetchAndDisplayList()` function to do this work.                |        2 |
| When a user clicks delete all shopping list items, delete them. Update this state in supabase, clear out the shopping list, and re-fetch and redisplay the updated items. Call your `fetchAndDisplayList()` function to do this work.               |        1 |

| Functions                                                                                |             |
| :----------------------------------------------------------------------------------- | ----------: |
| ASYNC: `createItem(item)` : create a item in supabase for the logged-in user |1|
| ASYNC: `deleteAllItems()` : delete all items  in supabasefor the logged-in user |1|
| ASYNC: `getItems()` : get all items in supabase for the logged-in user |1|
| ASYNC: `buyItem(id)` : complete this items in supabase for the logged-in user |1|
| PURE: `renderItem(item)` : takes in an item object and returns a DOM element |1|
| IMPURE: `fetchAndDisplayList()` : fetchest the items, clears out the list, and redisplays them |1|

## Stretch Goal Ideas

1) Allow users to un-buy items they accidentally click.
2) Allow users to delete individual shopping list items by clicking on a button next to the list item.
3) Add checkboxes and a "bulk buy" button. Allow users to "buy" or "un-buy" multiple items with a single click.
4) Loading spinner!
5) Give shopping list items a due date, and tell the user how long they have to buy each item. If a shopping list item is past its due date, style it differently.
6) What if users could _see a list of other users_, and click on that user to see _that user's shopping list_? Hint: you cannot directly query the `user` table, so you will need to create a weird separate table called `shopping_list_users`, and add a row to it whenever you create a new user. (https://stackoverflow.com/questions/68334303/supabase-how-to-query-users-by-email)

# Plan

![wireframes](/assets/wireframes.png)

## HTML

- hard coded:
  - section to hold everything
  - shopping list item form
    - either a dropdown or input for quantity
    - input for item name
    - submit button
  - div to render and append shopping list items
    - some default text like "add shopping list items to begin"
- dynamic:
  - shopping list item div
    - checkbox
    - div
      - quantity dropdown (which can edit the item in supabase)
      - delete item button or link (ideally can just be a link)
      - shopping list item in a p tag (editable)
      - buy/bought button
  - buy all button
    - only renders when an unbought item is checked
  - under all button
    - only renders when a bought item is checked
  - a delete all button (not in wireframes) - appended below the buy all/undo all buttons
    - user needs to confirm before deleting all

## Events

- on submitting new shopping list item via the form
  - add new shopping list item to supabase table
  - clear out shopping list container, fetches, render and appends all of the user's shopping list items
  - render and append all of the user's shopping list items
- on load, display user's shopping list
  - fetch user data from supabase
  - render and append all of the user's shopping list items
- on clicking bought button
  - updates item as bought in supabase
  - clears container
  - fetches, render and appends all of the user's shopping list items
    - bought items render differently (crossed out text)
- on clicking undo button (which was the bought button before)
  - updates item as NOT bought in supabase
  - clears container
  - fetches, render and appends all of the user's shopping list items
    - bought items render differently (crossed out text)
- on edits item name text
  - updates item name in supabase
  - clears container
  - fetches, render and appends all of the user's shopping list items
- on change of item quantity via dropdown
  - updates item quantity in supabase
  - clears container
  - fetches, render and appends all of the user's shopping list items
- on delete item button
  - deletes item in supabase
  - clears container
  - fetches, render and appends all of the user's shopping list items
- on checkbox click
  - if item is bought
    - render and append the buy all button at the bottom of shopping list (above delete button)
  - if item is not bought
    - render and append the buy all button at the bottom of shopping list (above delete button)
- on delete all button click
  - deletes all items in supabase
  - clears container
  - fetches, render and appends all of the user's shopping list items (none)
- on buy all button click
  - updates all checked items that have not been bought as bought in supabase
  - clears container
  - fetches, render and appends all of the user's shopping list items
    - bought items render differently (crossed out text)
- on under all button click
  - updates all checked items that have been bought as not bought in supabase
  - clears container
  - fetches, render and appends all of the user's shopping list items

## Order

1. supabase CRUD functions
2. hard code HTML
3. write render function
4. write form event listener
    1. write fetchAndDisplayList function
5. write on load event listener
6. write bought/undo button event listener
7. write delete all button event listener
8. write quantity change event listener
9. write delete item event listener
10. write checkbox click event listener
    1. write buy all event listener
    2. write undo all event listener
11. write edit item name event listener
12. stretch goals
