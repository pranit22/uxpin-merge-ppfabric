# Breadcrumb
  
```jsx
<div>
      <h5>With no maxDisplayedItems</h5>
      <Breadcrumb crumbs="file1,file2,file3" ariaLabel="Breadcrumb with no maxDisplayedItems" overflowAriaLabel="More links"/>

      <h5>With maxDisplayedItems set to three</h5>
      <Breadcrumb crumbs="one,two,three,four"
         maxDisplayedItems={3} ariaLabel="Breadcrumb with maxDisplayedItems set to three" overflowAriaLabel="More links"/>

      <h5>With maxDisplayedItems set to two and overflowIndex set to 1 (second element)</h5>
      <Breadcrumb crumbs="one,two,three,four" maxDisplayedItems={2} overflowIndex={1} ariaLabel="Breadcrumb with maxDisplayedItems set to 2 and overflowIndex set to 1" overflowAriaLabel="More links"/>
    </div>
```
  
