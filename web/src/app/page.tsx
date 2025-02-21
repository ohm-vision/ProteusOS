import Image from 'next/image';

import { Button, Card, CardActionArea, CardHeader } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import InstallPWA from '@/components/pwa/installPwa.component';

// import ProTip from '@/components/ProTip';
// import Copyright from '@/components/Copyright';

export default function Home() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={2}
      flexGrow={1}
      flexBasis="auto"
      flexWrap="wrap"
      my={2}
      >
      <InstallPWA />

      <Image src="/icons/icon-192x192.png" alt="logo" width={100} height={100} />
      <Typography variant="h4" component="h1">
        ProteusOS
      </Typography>
      <Typography variant="h5" component="h2">
        Privacy. Security. Yours.
      </Typography>
      <Box
        display="flex"
        flexDirection={[ "column", "row" ]}
        gap={2}
        >
        <Card>
          <CardActionArea
            href="/modules"
            >
            <CardHeader
              title="Modules"
              />
          </CardActionArea>
        </Card>

        <Card>
          <CardActionArea
            href="/settings"
            >
            <CardHeader
              title="Settings"
              />
          </CardActionArea>
        </Card>

      </Box>
      {/** only enable this if we have proteus-devops */}
      {/* <Card>
        <CardActionArea
          href="/environments"
          >
          <CardHeader
            title="Environments"
            />
        </CardActionArea>
      </Card> */}

      {/** only enable this if we have proteus-domains - reserved for future implementation */}
      {/* <Card>
        <CardHeader
          title="Domains"
          />
      </Card> */}

    </Box>

  );
}