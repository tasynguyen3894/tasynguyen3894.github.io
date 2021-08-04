Cũng như các bài dịch trước, sau khi đi làm về, mình lang thang trên [segmentfault](https://segmentfault.com/) tìm xem có gì đó đọc không để đỡ tối cổ. Tình cờ mình tìm được một bài về Vue, nói về vấn đề mình đang gặp công ty. Đọc xong thấy khá hay, nên mình tìm thử xem tác giả còn viết gì không thì ra được bài này. Một bài khá thú vị của tác giả __周绪南 (Châu Tự Nam)__. Một bạn developer còn khá trẻ (bạn sinh năm 1996). Thấy hay và có ích nên mình dịch sang tiếng Việt để chia sẽ cho mọi người. Các bạn có thể vào trang Github của tác giả để tham khảo các source code của bạn ấy nhé.

Link bài gốc: [前端跨域解决方案](https://segmentfault.com/a/1190000012256432)

### Browser Same Origin Policy

#### Browser Same Origin Policy là gì?

Same Origin Policy là một cơ chế bảo mật của trình duyệt.

Same Origin Policy có thể giải thích là cách để hạn chế những tài liệu hoặc mã được tải từ một nguồn khác với nguồn của tài nguyên. Đây là một cơ chế quan trọng để chống lại những nguy hại có thể xảy ra do mã độc.

Trước khi quyết định về việc hai url có cùng một nguồn hay không, hãy xem xét về các thành của một url (Uniform Resource Locator).

Nói về url thì url có các thành phần cơ bản là: __Giao thức__://__Tên domain (hoặc ip)__:__cổng (nếu có chỉ định)__/path

Hãy xem thử ví dụ dưới đây:

Đối với __http://www.example.com/static__ giao thức chính là http, tên miền là __www.example.com__, path chính là __static__. Số cổng thì bị bỏ qua trong url này vì nó đang dùng cổng mặc định (80).

Điều cần chú ý ở đây là phần tên miền. __example.com__ là tên miền chính và __www.example.com__ là tên cấp hai. Và cả với __a.example.com__ (cũng có thể là tên miền cấp hai). Cả ba tên miền trên là ba tên miền khác nhau.

Tôi sẽ không đi sâu vào chi tiết ở đây. Để biết thêm thông tin, bạn có thể tìm hiểu thêm các tài liệu về mạng máy tính.

Trở lại với câu hỏi cũ. Liệu có cách nào để nhận biết các trang có cùng tên miền không?

Câu trả lời là nếu giao thức và cổng (nếu được chỉ định) và hai tên miền đều giống nhau thì cả hai trang được xem là cùng một nguồn.

Hãy nói dễ hiểu hơn là ba yếu tố để xác định sự tương đồng chính là: giao thức, tên miền và cổng.

Cần lưu ý là nếu tên miền đó là tên miền cấp hai chẳng hạn như __www.example.com__ được đề cập ở trên, đồng thời tên miền đó được liên kết với một tên miền cấp hai khác là __a.example.com__. Mặc dù có tên miền chính giống nhau, nhưng tên miền phụ khác nhau nên chúng không phải cùng tên miền. Do đó, kéo theo hai tên miền này không thể tính là tương đồng. Điều này cũng tương tự với tên miền cấp ba, v.v...

Bảng dưới đây cung cấp những ví dụ về việc đánh giá độ tương đồng của các url với __http://store.company.com/dir/page.html__

|__url__|__Kết quả__|__Lý do__|
|---|:---:|---|
|http://store.company.com/dir2/other.html|Tương đồng||
|http://store.company.com/dir/inner/another.html|Tương đồng||
|https://store.company.com/secure|Không tương đồng|Khác giao thức (http và https)|
|http://store.company.com:81/dir/etc.html|Không tương đồng|Khác cổng (80 và 81)|
|http://news.company.com/dir/other.html|Không tương đồng|Khác tên miền (news và store)|

#### Giới thiệu về Cookie và Session
Khi bàn về Same Origin Policy, có một số điều cần thiết phải làm. Đó là nói về Cookie

Khi nói về Cookie, chúng ta nên tìm hiểu thêm về Session

Đối với cả hai, đây không cần phải có một phần giới thiệu lớn.

Nên ở đây, chúng ta tóm tắt ngắn gọn nhau sau:

- Cookie bị hạn chế bởi same-origin policy. Cookie ở trang A không thể được truy cập và chỉnh sửa khi bạn đang ở trang B.
- Sức lưu trữ tối đa của Cookie thường phổ biến ở mức 4KB và được thiết lập bởi server. Có thể chỉ định nội dung và vòng đời của Cookie được tạo ra bằng cách thiết lập giá trị cho Set-Cookie trong HTTP headers. Nếu được tạo ra bởi trình duyệt, nó sẽ bị vô hiệu hóa sau khi trình duyệt đóng lại.
- Cookie được lưu trữ ở trình duyệt, bởi vì mỗi lần một HTTP request được gửi, Cookie được gắn vào HTTP header một cách mặc định. Do điều đó nên Cookie chủ yếu được sử dụng nhầm xác thực thông tin. Đồng thời Cookie cũng không thường dùng để lưu trữ thông tin vì như vậy sẽ làm Cookie bị phình ra.
- Session được lưu trữ trên server và thường được kết hợp sử dụng với Cookie nhằm thực hiện xác thực và duy trì trạng thái.

Một số ví dụ về Cookie và Session

Giả sử chúng ta có một hệ thống quản lý thông tin sinh viên. Tại một thời điểm mà cơ sở dữ liệu đã có đủ các thông tin liên quan đến sinh viên như tài khoản, mật khẩu, các thông tin cá nhân... Sau đó, sinh viên đăng nhập vào hệ thống bằng các gửi thông tin tài khoản qua mật khẩu tới server backend bằng phương thức POST. Khi đó server sẽ thực hiện kiểm tra các tham số gửi lên và kiểm tra xem nó có khớp với những gì được lưu trong cơ sở dữ liệu.

Nếu quá trình kiểm tra thành công, tức là thông tin gửi lên là chính xác. Server backend sẽ ghi lại giá trị trong Session. Thường là tên tài khoản hoặc một trường duy nhất nào có của người dùng (id chẳng hạn).

Sau khi lưu dữ liệu lại trong Session, server sẽ phản hồi về cho phía client rằng quá trình đăng nhập đã thành công và client có thể thực hiện các chức năng (đòi hỏi phải đăng nhập) tiếp theo. Đồng thời, cũng trong thời điểm này server backend sẽ thêm một thuộc tính là Set-Cookie trong HTTP response, giá trị của nó chính là SessionID của Session hiện tại (SessionID này đang trỏ đến Session hiện tại của chúng ta, trong Express thì express-session sẽ thực hiện thiết lập quá trình này). Tất nhiên quá trình này cũng bao gồm việc thiết lập một số thuộc tính khác của Cookie như Expire time...

Khi trình duyệt nhận được HTTP response, nó sẽ thiết lập một cookie local. Thời gian hết hạn chính được xác định bởi giá trị của trường Expires trong Set-Cookie thuộc response trả về. Nếu trình duyệt bị đóng (hoặc khi Session hết hạn) mọi thứ sẽ bị vô hiệu hóa.

Sau quá trình đăng nhập, mỗi request gửi đến server từ trình duyệt sẽ được thêm những thông tin vài cookie một cách mặc định. Theo cách thức này, mỗi khi nhận được request từ client thì server sẽ tìm kiếm Session của chúng ta dựa vào SessionID trong cookie.

Nếu SessionID gửi lên được tìm thấy thì có nghĩa là client đã đăng nhập và chúng ta có thể thực hiện các chức năng tiếp theo.

Có một điều đáng lưu ý là cơ chế xác minh Session này người dùng hiện tại chỉ có thể lấy được Session của họ và sẽ không thể lấy được những Session khác. Mỗi Session của mỗi người dùng cũng giữ sự độc lập với nhau. Đồng nghĩa với việc khi có nhiều người dùng hệ thống trong một thời gian thì hệ thống cũng sẽ lưu trữ nhiều Session tương ứng.

Trên đây, tôi đã trình bày về các ví dụ của Session và Cookie.

#### Giới thiệu về iframe
Khi nói về các hạn chế của Same Origin Policy thì chúng ta còn có thể đề cập đến iframe.

iframe dùng để nhúng một trang con trong một trang lớn. Trong quá trình phát triển sản phẩm hằng ngày chúng ta không thể tránh được những vấn đề khi giao tiếp giữa các iframe khác nhau trong trang. Như sử dụng DOM, function hoặc biến của các iframe khác.

iframe cũng chịu ảnh hưởng bởi Same Origin Policy. Thuộc tính src của iframe chính là url trong Same Origin Policy. Còn về việc tương tác với DOM, biến và function của iframe cũng không quá phức tạp, chúng ta có thể dùng __contentDocument__ và __contentWindow__

Nếu hai iframe không tương đồng thì khả năng truy cập sẽ bị giới hạn.

Để giải quyết vấn đề trên. HTML5 giới thiệu một API mới đó là __postMessage__, một phương thức chủ yếu để giải quyết vấn đề liên lạc giữa iframe và cross-domain.

Sau đâu là một ví dụ: Nếu có hai trang khác nhau. Url của trang A là *http://localhost:4002/parent.html* còn url của trang B là http://localhost:4003/child.html. Bây giờ, tôi sẽ nhúng trang B vào trang A dưới dạng iframe cùng với đoạn code được đặt như bên dưới... Bây giờ tôi muốn gửi một thông điệp vào trang con B.

Code ở trang A

```html
<body>
<h1>A页面</h1>
<iframe src="http://localhost:4003/child.html" id="child">
</iframe>
<script>
    window.onload = function() {
        document.getElementById("child").contentWindow.postMessage("父页面发来贺电", "http://localhost:4003");
    } // 父页面发来贺电 => lời nhắn từ trang gốc
</script>
</body>
```