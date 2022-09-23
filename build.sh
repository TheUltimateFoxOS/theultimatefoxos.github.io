if [ -d "out" ]; then
	rm -rfv out
fi

if [ -d "src/docs" ]; then
	rm -rfv src/docs
fi

curl https://raw.githubusercontent.com/Glowman554/TheBot-reloaded/main/deno/install.sh | sudo sh
if [ -d "horizon" ]; then
	echo "no need to clone again"
else
	echo "cloning..."
	git clone https://github.com/TheUltimateFoxOS/horizon
fi

(
	cd horizon
	deno run -A tools/doc/main.ts http://example.com
	cp -rv docs ../src/docs
)

node build.js