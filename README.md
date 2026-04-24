

## Bugs (intentional — six)

**bug 1:** Max range filter keeps the wrong vehicles (uses `>=` instead of `<=`).

**bug 2:** Booking subtotal should be `price/hr × hours` but it uses `price/hr × 1.5` instead (ignores duration).

**bug 3:** Today’s date is shown on the home page, but the booking form still accepts a start date **before** today and shows a normal total (it should block or warn).

**bug 4:** “Top rated” sort should order by rating high → low, but the list is **shuffled randomly**.

**bug 5:** Help chat lists many questions, but the **reply is the answer to a different question** in the list (misplaced).

**bug 6: **search bar is missing on the home page and its in saved rides section** 


