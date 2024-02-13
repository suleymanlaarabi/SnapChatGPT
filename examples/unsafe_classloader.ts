import { StartFunctionProps } from "../src/index";

export default function start({ snapActivityContext }: StartFunctionProps) {
  snapActivityContext.events.push({
    start: () => {
      type("java.lang.Thread")
        .newInstance(
          javaInterfaces.runnable(() => {
            try {
              var okHttpClient = type("okhttp3.OkHttpClient$Builder", true)
                .newInstance()
                .followRedirects(false)
                .build();

              var response = okHttpClient
                .newCall(
                  type("okhttp3.Request$Builder", true)
                    .newInstance()
                    .url("https://github.com/")
                    .build()
                )
                .execute();
              logInfo("response: " + response.body().string());
            } catch (e) {
              logError(e);
            }
          })
        )
        .start();
    },
  });
}
