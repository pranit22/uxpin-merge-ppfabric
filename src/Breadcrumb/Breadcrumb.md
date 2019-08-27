# Breadcrumb
  
```jsx
<div>
      <h5>With no maxDisplayedItems</h5>
      <Breadcrumb items={[
        { text: 'Files', key: 'Files'},
        { text: 'This is folder 1', key: 'f1' },
        { text: 'This is folder 2 with a long name', key: 'f2' },
        { text: 'This is folder 3 long', key: 'f3' },
        { text: 'This is folder 4', key: 'f4' },
        { text: 'This is folder 5 another', key: 'f5', isCurrentItem: true }
    ]} ariaLabel="Breadcrumb with no maxDisplayedItems" overflowAriaLabel="More links"/>

      <h5>With maxDisplayedItems set to three</h5>
      <Breadcrumb items={[
        { text: 'Files', key: 'Files', href: '#/examples/breadcrumb', },
        {
            text: 'This is link 1',
            key: 'l1',
            href: '#/examples/breadcrumb'
        },
        {
            text: 'This is link 2',
            key: 'l2',
            href: '#/examples/breadcrumb'
        },
        {
            text: 'This is link 3 with a long name',
            key: 'l3',
            href: '#/examples/breadcrumb'
        },
        {
            text: 'This is link 4',
            key: 'l4',
            href: '#/examples/breadcrumb'
        },
        {
            text: 'This is link 5',
            key: 'l5',
            href: '#/examples/breadcrumb',
            isCurrentItem: true
        }
    ]} maxDisplayedItems={3} ariaLabel="Breadcrumb with maxDisplayedItems set to three" overflowAriaLabel="More links"/>

      <h5>With maxDisplayedItems set to two and overflowIndex set to 1 (second element)</h5>
      <Breadcrumb items={[
        { text: 'TestText1', key: 'TestKey1' },
        { text: 'TestText2', key: 'TestKey2' },
        { text: 'TestText3', key: 'TestKey3' },
        { text: 'TestText4', key: 'TestKey4' }
    ]} maxDisplayedItems={2} overflowIndex={1} ariaLabel="Breadcrumb with maxDisplayedItems set to 2 and overflowIndex set to 1" overflowAriaLabel="More links"/>
    </div>
```
  
