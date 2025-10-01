package com.reservo.modelo.peticion;

import lombok.Getter;

@Getter
public abstract class EmailMessages {

    public static String getHTML(String text1, String text2) {
        return """
        <div
            style="
              position: absolute;
              z-index: 100;
              color: white;
              top: 25%%;
              left: 50%%;
              transform: translateX(-50%%);
              padding: 2rem 3rem;
              background-color: #1f2937;
              border-radius: 1rem;
              border: 2px solid #f59e0b;
              width: 75%%;
              font-family: sans-serif;
            "
        >
          <table width="100%%" cellpadding="0" cellspacing="0" style="color: white;">
            <tr>
              <td align="center">
                <h2 style="color: #f59e0b; margin: 0;">RESERVO</h2>
              </td>
            </tr>
            <tr>
              <td>
                <div style="margin: 1rem 0 0 0;">%s</div>
              </td>
            </tr>
            <tr>
              <td>
                %s
              </td>
            </tr>
          </table>
        </div>
    """.formatted(text1, text2);
    }


    public static String getOrangeHTMLSpan(String text) {
        return "<span style=\"color: orange\">" + text + "</span>";
    }

}
