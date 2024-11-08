# Feature: Implement like button for books

- Ticket ID: FE-345
- Priority: Medium
- Story Points: 4

# Description

When the like button is pressed the liked books should be displayed in the sidebar. 

## Current behaviour

- Books are listed on the left
- Like button exists in book-card, but doesn't do anything

## Desired behaviour

When the user clicks like the list of liked books should be displayed in the sidebar.
The liked books should be displayed with a angular material list. It should only display the title of the book.

## Technical details

The `book-likes.service.ts` service provides the like specific API. 
This should be used to load the liked books and to store new likes.

## Acceptance Criteria

- Liked books should be loaded from API
- New likes should be stored using the API
- Loading should be displayed in the sidebar
