Dashboard.jsx (Main state + logic here)
│
├── Sidebar.jsx
│ ├── SideBarSection.jsx
│ ├── ProfileMenu.jsx
│ ├── AddTaskButton (reusable)
│ └── Search (reusable)
│
├── Header.jsx
│ ├── Welcome.jsx
│ ├── NameBar.jsx
│ ├── AddTaskButton (same component)
│ └── Search (same component)
│
└── MainContent.jsx (MainBox rename)
├── TaskSummary.jsx (Greeting + stats)
│
├── TaskFilters.jsx (ButtonBox rename)
│ ├── CategoryFilter.jsx (CategoryBtn)
│ ├── StatusFilter.jsx (Status)
│ ├── SortDropdown.jsx (SortBtn)
│ └── PriorityFilter.jsx (FilterBtn)
│
└── TaskList.jsx (TaskBox rename)
├── TaskCard.jsx (individual task)
└── EmptyState.jsx (if no tasks)

Reusable Components (shared folder):
├── AddTaskButton.jsx
├── Search.jsx
└── TaskModal.jsx (for add/edit)
