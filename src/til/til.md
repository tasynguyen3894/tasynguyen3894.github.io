## 2020-09-21

- You can custom `JSON.stringify` output with parameter `replacer` and `space`. Read more in [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)

    ```js
    const foo = {age: '26', name: 'Tasy'}
    JSON.stringify(foo, ['name']); // '{"name": "Tasy"}'
    JSON.stringify(foo, function (key, value) {
        if(key === 'age') { 
            return parseInt(value) + 1; 
        } 
        return value; 
    }); // '{"age":27,"name":"Tasy"}'
    ```

## 2020-09-17

- You need convert value from `innerText` before compare them with pure string data. Some character may make errors. 
Ex:

    ```js
    document.getElementById('div').innetText; // "Haha "
    document.getElementById('div').innetText === "Haha " // false
    ```


## 2020-09-15

- Basic Authentication for Nginx with `apache2-utils` 
- The iterable is a interface that specifies that an object can be accessible if it implements a method who is key is [symbol.iterator]

## 2020-09-04

- Use `call`, `bind`, `apply` to excute function with custom `this`. With `bind`, we create new instance and bind our function as this varible. With `call`, `apply`, we call this function with our this.
    ```js
    var car = {
        name: 'Audi',
        getCarName: function () {
            return this.name
        }
    }

    var carNamePrice = function (price) {
        return this.getCarName() + `'s price is $${price}`;
    }

    var review = carNameReview.bind(car);
    review(5000); // Audi's price is $5000
    carNameReview.call(car, 5000);  // Audi's price is $5000
    carNameReview.apply(car, [5000]);  // Audi's price is $5000
    ```

## 2020-08-26

- Show differrent between two branchs in `git`. Git give us many helpful arguments (`--stat`, `--name-status`, `--color`)

    ```
    git diff <arguments> branch_a..branch_b <path/to/file>
    ```

- Show file content in other branch in `git`

    ```
    git show <branch>:<file>
    ```

## 2020-08-21

- `in` and `Object.prototype.hasOwnProperty()` are the strategy  for determining if a property exists in an object with one exception. But you should use `in` carefully. Let see this example:

    ```js
    const Resorts = function () {
    this.Telluride = 4425;
    this.Vail = 3450;
    }

    // Brian's object of Resorts
    const brianResorts = new Resorts();

    // Jesse's object of Resorts
    const jesseResorts = new Resorts();

    // modify function prototype
    Resorts.prototype.Breckenridge = 3398;

    const breckInBrianResorts = 'Breckenridge' in brianResorts; // true
    const breckInJesseResorts = 'Breckenridge' in jesseResorts; // true
    ```

## 2020-08-19

- You can use vim like a pipeline

    ```
    git log | vim
    ```

- `td` is command line utility for translating or deleting characters.

    ```
    echo "hehehe" | tr "[:lower:]" "[:upper:]"
    pwd | tr -d '\n'
    ```

## 2020-08-14

- Make git alias with `git config --global alias.<alias> <git command>`. If you want to define git command with parameter, you must put them in double quotes. Ex:

    ```
    git config --global alias.co checkout
    git config --global alias.small-graph "log --oneline --graph"
    ```

- You can show git log as your format with `git log --format="<Format>"`. Read more in [here](https://git-scm.com/docs/pretty-formats)

    ```
    git log --format="%h - %an"
    8b105eb8 - tasynguyen3894
    f0f7fc63 - tasynguyen3894
    560a6d61 - tasynguyen3894
    42a0fd6d - tasynguyen3894
    d29377c0 - tasynguyen3894
    9f770a6f - tasynguyen3894
    ```

- Use pipe `pbcopy` to copy output command to clipboard in MacOS

    ```
    pwd | pbcopy
    ```

- Get current git branch with command `git rev-parse --abbrev-ref HEAD`

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

- Wrap email html in table tag like this code

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

- In gmail app, if your mail is sended which the same as previous content, them will be clipped by gmail.

## 2020-07-23

- [`sql`] If you want excute this query `select * from table limit 10 offset 50` (haven't anywhere clause) with large record. You shound use `select * from table where id > 50 limit 10` 

## 2020-07-21

- Use `prettier` to format code. Prettier help we avoid some problem about format code.