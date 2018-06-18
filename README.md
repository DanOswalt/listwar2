# listwar2

> Vue version of my old listwar app

- Use Material design
- Mobile First
- Vue-Router to move between sections
- Major components:
  - List (input, then read-only)
  - Battle
  - Results
  - Menu? Home screen?
- Recent lists / Results
- Shared lists?
- How to share a list easily?
- Login or no? Localstorage? OAuth?

- Localstorage for not-signed in
- OAuth for users?

- First, design layout. Do Simple Layout w/Navbar
- Home page has cards of recent lists.
- A list card has a front and back. On the front is the list, on the back is the results.
- This list either pulled from localStorage or user
- List is final once submitted. The list can be deleted but no edited


class List = {
  id : docId,
  creator : user_id
  createdOn : date,
  completedOn : date,
  completed : bool,
  entries : [
    { 
      val : string,
      id : int,
      wins : int
    }
  ],
  battleOrder : [
    [ id, id ]
  ],
  lastBattle : int, [index in battle order]
}




