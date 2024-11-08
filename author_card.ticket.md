# Feature: Add Author Card Display with Detail Button

- Ticket ID: FE-247
- Priority: Medium
- Story Points: 5

## Description

Add functionality to display author information in a card layout when users click a "Detail" button next to books in the left sidebar list.

## Current Behavior

- Books are listed in the left sidebar
- No author information is currently displayed
- No detail button exists

## Desired Behavior

Add a "Detail" button next to each book in the left sidebar
When clicked, display an author card on the right side of the screen
Author card should show all relevant author information in a well-organized layout

### Technical Details

**Author Model**

```typescript
export type Author = {
  id: string;
  name: string,
  address: string,
  age: number,
  height: number,
}
```

#### Requirements

Add a "Detail" button component to each book item in the list
Create a new AuthorCard component that displays:

Author's name as a header
Address, age, and height in an organized layout
Consider using a grid or flex layout for clean presentation


Implement click handler to fetch and display author data
Add appropriate loading states
Handle error cases (author not found, network issues)

#### Acceptance Criteria

- Detail button is visible next to each book
- Clicking detail button displays author card
- Author card shows all fields from the Author model
- Loading states are implemented
- Error states are handled gracefully
- Card layout is responsive
- Author card updates when different books are selected

#### Design Notes

Use existing material design system components where possible
Maintain consistent spacing and typography
