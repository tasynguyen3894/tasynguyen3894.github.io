## 2020-08-13

- Use `!!` in command to paste previous command

    ```
    sudo !!
    ```
- In React, you can display html string to html tag with dangerouslySetInnerHTML. It similar to `v-html` in Vue. Ex:

    ```html
    <div dangerouslySetInnerHTML={{
        __html: 'Hi <b>Dude</b>'
    }}></div>
    ```

## 2020-08-12

- If you want to make your SVG element's color inherited their color, you can use `fill="currentColor`

- In python, use `join()` to join array string is better than loop with `+`. Good to look and good performance too. Read more in [this article](https://towardsdatascience.com/do-not-use-to-join-strings-in-python-f89908307273)

## 2020-08-11

- In PHP, use this code may make some stupid error
    ```php
    $a = ['name' => 'John'];
    if(isset($a['age']) || $a['age'] > 5) {
        return false;
    }
    ```

- In PHP, `@` is used to suppressed error messages.
    ```
    Don't fucking use this shit!!!
    ```

## 2020-08-10

- We can display git history tree in command with `git log --graph`

## 2020-08-06

- You can create repository in github with name as same with your account. The repository's README.md will display in your Github profile like a landing page
`
## 2020-08-03

- Today is my birthday.
- Beside `fs.readFile`, we also use `readline`, `stream` to make a action similar to lazy load for read a large file.
- explainshell.com - useful website to explain command

## 2020-07-31

- Use `xargs` to apply command for input (`grep`, `find`...)
- Remove branch which aren't exists on remote `git remote prune origin`

## 2020-07-30

- In Javascript with the + operator, variable type is converted to string and the rest operator will convert to string (need improve)

## 2020-07-29

- If you want use gulp-gh-pages, you must put `/**/*` in the end of dist path

- Event `beforeunload` will not work if there is not user interaction.

## 2020-07-27

Wrap email html in table tag like this code

```html
<table>
    <tr>
        <td>
            Content
        </td>
    </tr>
</table>
```

## 2020-07-24

In gmail app, if your mail is sended which the same as previous content, them will be clipped by gmail.

## 2020-07-23

[`sql`] If you want excute this query `select * from table limit 10 offset 50` (haven't anywhere clause) with large record. You shound use `select * from table where id > 50 limit 10` 

## 2020-07-21

Use `prettier` to format code. Prettier help we avoid some problem about format code.